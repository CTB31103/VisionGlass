import moment from "moment";
import {
  IRefreshToken,
  ISeenCount,
  IUser,
  IUserStatistic,
  UserType,
} from "../interfaces";
import {
  MongoDoc,
  RefreshTokenModel,
  RootFilterQuery,
  SeenCountModel,
  User,
  UserModel,
  UserStatisticModel,
} from "../models";
import {
  TryCatch,
  Log,
  HashUtils,
  SessionController,
  TokenUtils,
} from "../utils";
import Validators, { RULES, validationV2 } from "../validators";
import ControllerFunc from "./controllerFunc";
import CONSTANTS from "../constants";

/**
 * Expected Body:
 * 
  {
    "username": "ironman",
    "password": "ironman",
    "userType": "admin",
    
    "firstName": "iron",
    "lastName": "man",
    "email": "ironman@gmail.com",
    "phone": "333"
  }
 * 
 * */
const createUser = ControllerFunc((req, res) =>
  SessionController(
    async ({ session, abort }) =>
      await TryCatch(
        async () => {
          const validBody =
            Validators.UserControllerValidators.createUserValidator(req.body);

          const createdUser: IUser = {
            userId: HashUtils.uniqueId(),
            username: validBody.username.replaceAll(" ", "").toLowerCase(),
            password: await HashUtils.encrypt(validBody.password),
            userType: validBody.userType,
            profilePictureId: "",
            info: {
              firstName: validBody.firstName,
              lastName: validBody.lastName,
              email: validBody.email,
              phone: validBody.phone,
            },
            isRootUser: false,
          };

          const createdUserStatistic: IUserStatistic = {
            userStatisticId: HashUtils.uniqueId(),
            userId: createdUser.userId,
            monthOf: new Date().getMonth() + 1, // Dates come array index based, add one to be human readable
            currentCustomers: 0,
            monthsCustomers: 0,
            totalCustomers: 0,
          };

          const createdRefreshToken: IRefreshToken = {
            token: "",
            userId: createdUser.userId,
            expiresOn: 0,
          };

          const createdSeenCount: ISeenCount = {
            userId: createdUser.userId,
            chatGroups: [],
          };

          const userDoc: MongoDoc<User> = (
            await UserModel.create([createdUser], { session })
          )[0];
          await UserStatisticModel.create([createdUserStatistic], { session });
          await RefreshTokenModel.create([createdRefreshToken], { session });
          await SeenCountModel.create([createdSeenCount], { session });

          res.status(200).json({ user: userDoc.toClientUser() });
        },
        async (err) => (await abort(), res.status(500).json({ error: err })),
      ),
  ),
);

/**
 * Expected Query Params:
 * 
  ?userId=SOME_ID_HERE
 * 
 * */
const getUsers = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const { isRootUser } = Validators.TokenValidators.resLocalsTokenValues(
        res.locals,
      );
      const { validData, errorMsg } = validationV2<{
        userId?: string;
        userIds?: string | string[];
        query?: string;
        sortBy?: string;
        role?: string;
      }>(
        {
          userId: [RULES.common.optionalString, ""],
          userIds: [
            req.query.userIds !== undefined && Array.isArray(req.query.userIds)
              ? RULES.common.optionalArray
              : RULES.common.optionalString,
            "",
          ],
          query: [RULES.common.optionalString, ""],
          sortBy: [RULES.common.optionalString, ""],
          role: [RULES.common.optionalString, ""],
        },
        req.query,
      );
      const { pageLimit, pageNumber } =
        Validators.PaginationValidation.getPaginatedQuery(req.query);

      let databaseQuery: RootFilterQuery<IUser> = {
        $and: isRootUser ? [] : [{ isRootUser: false }], // Only the root user can ever see root user information
      };
      let sort: { [key: string]: number } = {};

      if (validData?.userId) {
        databaseQuery.$and!.push({ userId: validData.userId });
      }

      if (validData?.userIds) {
        if (Array.isArray(validData.userIds))
          databaseQuery.$and!.push({ userId: { $in: validData.userIds } });
        else databaseQuery.$and!.push({ userId: validData.userIds });
      }

      if (validData?.query) {
        const queryFirstWord = validData?.query.split(" ")[0];
        const regexQuery = { $regex: validData?.query, $options: "i" };
        databaseQuery.$and!.push({
          $or: [
            { "info.firstName": regexQuery },
            { "info.email": regexQuery },
            { "info.lastName": regexQuery },
            { "info.phone": regexQuery },
            { username: regexQuery },
            {
              $and: [
                { "info.firstName": { $regex: queryFirstWord, $options: "i" } },
                {
                  "info.lastName": {
                    $regex: validData?.query.replace(queryFirstWord + " ", ""),
                  },
                },
              ],
            },
          ],
        });
      }

      if (validData?.role) {
        databaseQuery.$and!.push({
          userType: validData.role as UserType,
        });
      }

      if (validData?.sortBy) {
        switch (validData.sortBy) {
          case "Position":
            sort = { userType: 1 };
            break;
          case "Email":
            sort = { "info.email": 1 };
            break;
          case "Last Name":
            sort = { "info.lastName": 1 };
            break;
          case "First Name":
          default:
            sort = { "info.firstName": 1 };
            break;
        }
      }

      const userPaginationResult = await UserModel.paginate(databaseQuery, {
        limit: pageLimit,
        page: pageNumber,
        sort: sort,
      });

      return res.status(200).json({
        users: userPaginationResult.docs.map((u) => u.toClientUser()),
        page: userPaginationResult.page ?? pageNumber,
        pageLimit: userPaginationResult.limit,
        total: userPaginationResult.totalDocs,
        totalPages: userPaginationResult.totalPages,
      });
    },
    (err) => res.status(500).json({ error: err }),
  ),
);

/**
 * Expected Body:
 * 
  {
    "username": "johnyappleseed",
    "password": "johnyappleseed",
    "trustSource": false
  }
 * 
 * */
const loginUser = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const validBody = Validators.UserControllerValidators.loginUser(req.body);

      const potentialUser: MongoDoc<User> | null = await UserModel.findOne({
        username: validBody.username,
      });
      if (!potentialUser) throw new Error(`Incorrect username or password`);

      const user = potentialUser.toUser();
      const pwdMatch = await HashUtils.decrypt(
        user.password,
        validBody.password,
      );
      if (!pwdMatch) throw new Error(`Incorrect username or password...`);

      const token = TokenUtils.signJWTToken(
        {
          id: user.userId,
          role: user.userType,
          isRootUser: user.isRootUser,
        },
        "short",
      );

      if (validBody.trustSource) {
        const refreshTokenJWT = TokenUtils.signJWTToken(
          { id: user.userId, role: user.userType, isRootUser: user.isRootUser },
          "long",
        );
        const refreshToken: IRefreshToken = {
          token: refreshTokenJWT,
          userId: user.userId,
          expiresOn: moment().add(7, "days").toDate().getTime(),
        };
        const updated = await RefreshTokenModel.findOneAndUpdate(
          { userId: user.userId },
          refreshToken,
        );
        if (!updated) await RefreshTokenModel.create([refreshToken]);

        res.cookie(CONSTANTS.auth.jwt.headerRefreshKey, refreshTokenJWT, {
          httpOnly: true,
          secure: CONSTANTS.env.isProduction(), // true over HTTPS
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        });
      }

      res.status(200).json({ user: user.toClientUser(), token });
    },
    (err) => res.status(500).json({ error: err }),
  ),
);

/**
 * Expected Header:
 * 
  {
    "cookie": 'vag-r-key=...'
  }
 * 
 * */
const refreshUserWithRefreshToken = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const { refreshToken } =
        Validators.UserControllerValidators.refreshUserWithRefreshToken(
          req.headers,
        );

      const refreshTokenDoc = await RefreshTokenModel.findOne({
        token: refreshToken,
      });

      if (!refreshTokenDoc) throw new Error("Token not recognized / Revoked");

      if (new Date().getTime() > refreshTokenDoc.expiresOn) {
        throw new Error("Token expired. Please login again.");
      }

      const decoded = await TokenUtils.decodeJWTToken(refreshToken);

      const user = await UserModel.findOne({ userId: decoded.id });
      if (!user) throw new Error(`Provided user does not exist`);

      const accessToken = TokenUtils.signJWTToken(
        { id: decoded.id, role: decoded.role, isRootUser: decoded.isRootUser },
        "short",
      );
      res.status(200).json({ user: user.toClientUser(), token: accessToken });
    },
    (err) => {
      res.clearCookie(CONSTANTS.auth.jwt.headerRefreshKey, {
        httpOnly: true,
        secure: CONSTANTS.env.isProduction(), // true over HTTPS
        sameSite: "strict",
      });
      res.status(500).json({ error: err });
    },
  ),
);

/**
 * Expected Header:
 * 
  {
    "authorization": 'Bearer ...'
  }
 * 
 * */
const logoutUser = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const { userId } = Validators.TokenValidators.resLocalsTokenValues(
        res.locals,
      );

      Log.colors.yellow(`Logging out ${userId}`);

      await RefreshTokenModel.findOneAndUpdate(
        { userId },
        { token: "", expiresOn: 0 },
      );
      res.clearCookie(CONSTANTS.auth.jwt.headerRefreshKey, {
        httpOnly: true,
        secure: CONSTANTS.env.isProduction(), // true over HTTPS
        sameSite: "strict",
      });

      res.status(200).json({});
    },
    (err) => res.status(500).json({ error: err }),
  ),
);

/**
 * Expected Body:
 * 
{
    "username": "janedoe",
    "firstName": "jane",
    "lastName": "doe",
    "email": "janedoe@gmail.com",
    "phone": "8889888",
    "profilePictureId": "6a1fb38231ba5de9b08b8a8a.webp"
}
 * 
 * */
const editUser = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const { userId: authorId } =
        Validators.TokenValidators.resLocalsTokenValues(res.locals);
      const { userId } = Validators.UserControllerValidators.userId(req.params);
      const { username, email, firstName, lastName, phone } =
        Validators.UserControllerValidators.editUser(req.body);

      const user: MongoDoc<User> | null = await UserModel.findOneAndUpdate(
        { userId },
        {
          username,
          // profilePictureId,
          info: { firstName, lastName, email, phone },
        },
        { returnDocument: "after" },
      );
      if (!user) throw new Error(`Could not find user`);

      res.status(200).json({ user: user.toClientUser() });
    },
    (err) => res.status(500).json({ error: err }),
  ),
);

/**
 * Expected Header:
 * 
  {
    "authorization": 'Bearer ...'
  }
 * 
 * */
const loginUserWithAccessToken = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const { userId } = Validators.TokenValidators.resLocalsTokenValues(
        res.locals,
      );
      const user = await UserModel.findOne({ userId });
      if (!user) throw new Error(`Provided user does not exist`);

      res.status(200).json({ user: user.toClientUser() });
    },
    (err) => res.status(500).json({ error: err }),
  ),
);

const searchUsers = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const { isRootUser } = Validators.TokenValidators.resLocalsTokenValues(
        res.locals,
      );
      const { query } = Validators.UserControllerValidators.searchUsers(
        req.query,
      );

      const queryFirstWord = query.split(" ")[0];
      const regexQuery = { $regex: query, $options: "i" };

      const databaseQuery: RootFilterQuery<IUser> = {
        $and: [],
      };

      if (!isRootUser) {
        databaseQuery.$and!.push({
          isRootUser: false,
        });
      }

      databaseQuery.$and!.push({
        $or: [
          { "info.firstName": regexQuery },
          { "info.email": regexQuery },
          { "info.lastName": regexQuery },
          { "info.phone": regexQuery },
          { username: regexQuery },
          {
            $and: [
              { "info.firstName": { $regex: queryFirstWord, $options: "i" } },
              {
                "info.lastName": {
                  $regex: query.replace(queryFirstWord + " ", ""),
                },
              },
            ],
          },
        ],
      });

      const users = (await UserModel.find(databaseQuery)).map((user) =>
        user.toClientUser(),
      );

      res.status(200).json({ users });
    },
    (err) => res.status(500).json({ error: err }),
  ),
);

const userHasAccess = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const { userId } = Validators.TokenValidators.resLocalsTokenValues(
        res.locals,
      );
      const user = await UserModel.findOne({ userId });
      if (!user) throw new Error(`Could not find user`);

      res.send({ granted: true });
    },
    (err) => {
      res.status(500).json({ error: err });
    },
  ),
);

const getUser = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const { isRootUser } = Validators.TokenValidators.resLocalsTokenValues(
        res.locals,
      );
      const { validData, errorMsg } = validationV2<{ userId: string }>(
        { userId: [RULES.common.requiredString, ""] },
        req.params,
      );
      if (errorMsg || !validData) throw new Error(errorMsg);

      const { userId } = validData;

      const user = await UserModel.findOne(
        isRootUser ? { userId } : { userId, isRootUser: false },
      );

      if (!user) throw new Error(`Team member could not be found`);

      res.send({ user: user.toClientUser() });
    },
    (err) => {
      res.status(500).json({ error: err });
    },
  ),
);

export const UserController = {
  createUser,
  getUsers,
  getUser,
  loginUser,
  refreshUserWithRefreshToken,
  logoutUser,
  loginUserWithAccessToken,
  editUser,
  searchUsers,
  userHasAccess,
};
