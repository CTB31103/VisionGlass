import Validator from "validatorjs";
import Validate, { requiredWith } from "./validate";
import { UserType } from "../interfaces";
import CONSTANTS from "../constants";

const USER_RULES = {
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
): [
  {
    username: string;
    password: string;
    userType: UserType;
  },
  (
    | {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
      }
    | undefined
  ),
] => {
  const requiredRules = {
    username: USER_RULES.username,
    password: USER_RULES.password,
    userType: USER_RULES.userType,
  };

  let validator = new Validator(body, requiredRules);
  Validate(validator);

  const optionalRules = {
    ...USER_RULES.info,
  };

  validator = new Validator(body, optionalRules);
  Validate(validator);

  const requiredInfo = {
    username: body.username as string,
    password: body.password as string,
    userType: body.userType as UserType,
  };

  let optionalInfo = undefined;

  if (body?.firstName) {
    optionalInfo = {
      firstName: body.firstName as string,
      lastName: body.lastName as string,
      email: body.email as string,
      phone: body.phone as string,
    };
  }

  return [requiredInfo, optionalInfo];
};

const getUsersValidation = (params: any) => {
  const rules = {
    userId: USER_RULES.userId,
  };

  const validator = new Validator(params, rules);
  Validate(validator);

  const info = {
    userId: (params?.userId || undefined) as string | undefined,
  };

  return info;
};

const loginUser = (body: any) => {
  const rules = {
    username: USER_RULES.username,
    password: USER_RULES.password,
    trustSource: "required|boolean",
  };

  const validator = new Validator(body, rules);
  Validate(validator);

  return {
    username: body.username as string,
    password: body.password as string,
    trustSource: body.trustSource as boolean,
  };
};

const refreshUser = (header: any) => {
  let rules: any = {
    cookie: "required|string",
  };

  let validator = new Validator(header, rules);
  try {
    Validate(validator);
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
    profilePictureId: USER_RULES.profilePictureId,
  };

  const validator = new Validator(body, rules);
  Validate(validator);

  return {
    username: body.username as string,
    firstName: body.firstName as string,
    lastName: body.lastName as string,
    email: body.email as string,
    phone: body.phone as string,
    profilePictureId: body.profilePictureId as string,
  };
};

const UserControllerValidators = {
  createUserValidator,
  getUsersValidation,
  loginUser,
  refreshUser,
  editUser,
};

export default UserControllerValidators;
