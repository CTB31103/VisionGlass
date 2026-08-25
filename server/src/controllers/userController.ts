import moment from "moment";
import {
  IRefreshToken,
  ISeenCount,
  IUser,
  IUserStatistic,
} from "../interfaces";
import {
  MongoDoc,
  RefreshTokenModel,
  SeenCount,
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
import Validators from "../validators";
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
            username: validBody.username,
            password: await HashUtils.encrypt(validBody.password),
            userType: validBody.userType,
            profilePictureId: "",
            info: {
              firstName: validBody.firstName,
              lastName: validBody.lastName,
              email: validBody.email,
              phone: validBody.phone,
            },
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

          res.status(200).json({ newUser: userDoc.toClientUser() });
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
      const params = Validators.UserControllerValidators.getUsersValidation(
        req.query,
      );

      let query = {};

      if (params.userId) {
        query = { userId: { $in: params.userId.split(",") } };
      }

      const users = (await UserModel.find(query)).map((userDoc) =>
        userDoc.toClientUser(),
      );

      return res.status(200).json({ users: users });
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
        },
        "short",
      );

      if (validBody.trustSource) {
        const refreshTokenJWT = TokenUtils.signJWTToken(
          { id: user.userId, role: user.userType },
          "long",
        );
        const refreshToken: IRefreshToken = {
          token: refreshTokenJWT,
          userId: user.userId,
          expiresOn: moment().add(7, "days").toDate().getTime(),
        };
        await RefreshTokenModel.findOneAndUpdate(
          { userId: user.userId },
          refreshToken,
        );

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
        { id: decoded.id, role: decoded.role },
        "short",
      );
      res.status(200).json({ user: user.toClientUser(), token: accessToken });
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
      const { userId } = Validators.TokenValidators.resLocalsTokenValues(
        res.locals,
      );
      const { username, email, firstName, lastName, phone, profilePictureId } =
        Validators.UserControllerValidators.editUser(req.body);

      const user: MongoDoc<User> | null = await UserModel.findOneAndUpdate(
        { userId },
        {
          username,
          profilePictureId,
          info: { firstName, lastName, email, phone },
        },
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
      const { query } = Validators.UserControllerValidators.searchUsers(
        req.query,
      );

      const queryFirstWord = query.split(" ")[0];
      const regexQuery = { $regex: query, $options: "i" };

      const users = (
        await UserModel.find({
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
        })
      ).map((user) => user.toClientUser());

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

export const UserController = {
  createUser,
  getUsers,
  loginUser,
  refreshUserWithRefreshToken,
  logoutUser,
  loginUserWithAccessToken,
  editUser,
  searchUsers,
  userHasAccess,
};
