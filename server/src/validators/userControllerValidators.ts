import { UserType } from "../interfaces";
import CONSTANTS from "../constants";
import {
  RULES,
  ValidateFunc,
  Validator,
  requiredWith,
  validationV2,
} from "./validate";
import { ROOT_USERNAME } from "../scripts";

export const USER_RULES = {
  userId: "string|min:0|max:75",
  username: "required|string|min:3|max:30",
  password: "required|string|min:6|max:100",
  userType: "required|in:admin,technician,sales",
  profilePictureId: "required|string|min:0|max:100",
  info: {
    firstName: `string|min:0|max:50|${requiredWith(["lastName", "email", "phone"])}`,
    lastName: `string|min:0|max:50|${requiredWith(["firstName", "email", "phone"])}`,
    email: `email|max:100|${requiredWith(["lastName", "firstName", "phone"])}`,
    phone: `string|min:0|max:20|${requiredWith(["lastName", "email", "firstName"])}`,
  },
};

const createUserValidator = (
  body: any,
): {
  username: string;
  password: string;
  userType: UserType;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
} => {
  const requiredRules = {
    username: USER_RULES.username,
    password: USER_RULES.password,
    userType: USER_RULES.userType,
    ...USER_RULES.info,
  };

  let validator = new Validator(body, requiredRules);
  ValidateFunc(validator);

  const requiredInfo = {
    username: body.username as string,
    password: body.password as string,
    userType: body.userType as UserType,
    firstName: body.firstName as string,
    lastName: body.lastName as string,
    email: body.email as string,
    phone: body.phone as string,
  };

  return requiredInfo;
};

const getUsersValidation = (params: any) => {
  const rules = {
    userId: USER_RULES.userId,
  };

  const validator = new Validator(params, rules);
  ValidateFunc(validator);

  const info = {
    userId: (params?.userId || undefined) as string | undefined,
  };

  return info;
};

const loginUser = (body: any) => {
  const rules = {
    username: USER_RULES.username,
    password:
      body.username === ROOT_USERNAME
        ? "required|string|max:100"
        : "required|string|min:6|max:100",
    trustSource: "required|boolean",
  };

  const validator = new Validator(body, rules);
  ValidateFunc(validator);

  return {
    username: body.username as string,
    password: body.password as string,
    trustSource: body.trustSource as boolean,
  };
};

const refreshUserWithRefreshToken = (header: any) => {
  let rules: any = {
    cookie: "required|string",
  };

  let validator = new Validator(header, rules);
  try {
    ValidateFunc(validator);
  } catch (err) {
    throw new Error(`Missing cookie`);
  }

  const key = CONSTANTS.auth.jwt.headerRefreshKey + "=";
  if (!(header.cookie as string).includes(key))
    throw new Error(`Missing token`);

  return {
    refreshToken: (header.cookie as string).replace(key, ""),
  };
};

const editUser = (body: any) => {
  const rules = {
    username: USER_RULES.username,
    firstName: USER_RULES.info.firstName,
    lastName: USER_RULES.info.lastName,
    email: USER_RULES.info.email,
    phone: USER_RULES.info.phone,
    // profilePictureId: USER_RULES.profilePictureId,
  };

  const validator = new Validator(body, rules);
  ValidateFunc(validator);

  return {
    username: body.username as string,
    firstName: body.firstName as string,
    lastName: body.lastName as string,
    email: body.email as string,
    phone: body.phone as string,
    // profilePictureId: body.profilePictureId as string,
  };
};

const userId = (data: any) => {
  const { validData, errorMsg } = validationV2<{ userId: string }>(
    { userId: [RULES.common.requiredString, ""] },
    data,
  );
  if (errorMsg || !validData) throw new Error(errorMsg);
  return {
    userId: validData.userId,
  };
};

const searchUsers = (queryParams: any) => {
  const rules = {
    query: "required|string|min:0|max:125",
  };

  const validator = new Validator(queryParams, rules);
  ValidateFunc(validator);

  return {
    query: queryParams.query as string,
  };
};

const UserControllerValidators = {
  createUserValidator,
  getUsersValidation,
  loginUser,
  refreshUserWithRefreshToken,
  editUser,
  searchUsers,
  userId,

  USER_RULES,
};

export default UserControllerValidators;
