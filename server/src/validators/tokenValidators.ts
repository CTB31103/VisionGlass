import { ValidateFunc, Validator } from "./validate";
import { UserType } from "../interfaces";

const bearerTokenPresent = (header: any) => {
  const rules = {
    authorization: "required|string",
  };

  const validator = new Validator(header, rules, {
    required: "Unauthorized access, please login again",
    string: "Unauthorized access, please login again",
  });
  ValidateFunc(validator);

  return (header.authorization as string).replace("Bearer ", "");
};

const refreshCookiePresent = (header: any) => {
  const rules = {
    cookie: "required|string",
  };

  const validator = new Validator(header, rules, {
    required: "Unauthorized access, please login again",
    string: "Unauthorized access, please login again",
  });
  ValidateFunc(validator);

  return (header.cookie as string).replace("vag-r-key=", "");
};

const tokenPayload = (payload: any) => {
  const rules = {
    id: "required|string",
    role: "required|string",
    createdOn: "required|numeric",
  };

  const validator = new Validator(payload, rules, {
    required: "Mutated token, please login again",
    string: "Mutated token, please login again",
    numeric: "Mutated token, please login again",
  });
  ValidateFunc(validator);

  return {
    id: payload.id,
    role: payload.role,
    createdOn: payload.createdOn,
  };
};

const resLocalsTokenValues = (locals: any) => {
  const rules = {
    userId: "required|string",
    role: "required|in:admin,technician,sales",
    isRootUser: "required|boolean",
  };

  const validator = new Validator(locals, rules);
  ValidateFunc(validator);

  return {
    userId: locals.userId as string,
    role: locals.role as UserType,
    isRootUser: Boolean(locals.isRootUser) as boolean,
  };
};

export const TokenValidators = {
  bearerTokenPresent,
  refreshCookiePresent,
  tokenPayload,
  resLocalsTokenValues,
};
