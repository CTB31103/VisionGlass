// Documentation can be found here
// https://github.com/mikeerickson/validatorjs#readme

import ValidatorJs from "validatorjs";

export type IRules = { [key: string]: string };

export type IRulesV2<T> = { [K in keyof T]: [string, string] };

export const RULES = {
  string: "string",
  email: "string",
  numeric: "numeric",
  boolean: "boolean",
  date: "date",

  required: "required",
  present: "present",
  array: "array",

  common: {
    requiredString: "required|string|min:1",
    requiredBool: "required|boolean",
    requiredNumber: "required|numeric",
    requiredArray: "required|array",
    requiredEmail: "required|email",

    optionalArray: "present|array",
    optionalString: "present|string",
    optionalNumber: "present|numeric",
    optionalEmail: "present|email",
  },

  min: (len: number) => `min:${len}`,
  max: (len: number) => `max:${len}`,
  same: (attr: string) => `same:${attr}`,
  size: (len: number) => `size:${len}`,
  in: (vals: string[]) => `in:${vals.join(",")}`,
  multiple: (...params: string[]) => params.join("|"),
};

export const Validator = ValidatorJs;

export const validatorThrowErrors = (
  data: unknown,
  validator: ValidatorJs.Validator<unknown>,
  log = false,
) => {
  if (validator.passes()) return;

  const allErrors = validator.errors.all();

  if (log) {
    console.log(`Invalid data`, 0);
    console.log(allErrors);
    console.log(data);
  }

  for (const key in allErrors) {
    const error = validator.errors.first(key);

    if (error) throw new Error(error);
  }
};

type IValidData<T> = T | undefined;
type IErrorMsg = string | undefined;

type ICombinedValidationResponse<T> = [IValidData<T>, IErrorMsg] & {
  validData: IValidData<T>;
  errorMsg: IErrorMsg;
};

export const validationV2 = <T extends object>(
  funcRules: { [K in keyof T]: [string, string] },
  data: unknown,
): ICombinedValidationResponse<T> => {
  const rules: IRules = {};
  const attributeNames: IRules = {};

  const craftReturnObj = (
    vd: IValidData<T>,
    erm: IErrorMsg,
  ): ICombinedValidationResponse<T> => {
    return Object.assign([vd, erm] as [IValidData<T>, IErrorMsg], {
      validData: vd,
      errorMsg: erm,
    });
  };

  for (const key in funcRules) {
    const keyRules = funcRules[key];
    rules[key] = keyRules[0];

    if (keyRules[1].length !== 0) attributeNames[key] = keyRules[1];
  }

  let errorMsg: string | undefined = undefined;

  try {
    const validator = new Validator(data, rules);
    validator.setAttributeNames(attributeNames);
    validatorThrowErrors(data, validator);
  } catch (err) {
    errorMsg =
      err instanceof Error
        ? err.message
        : typeof err === "string"
          ? err
          : String(err);

    return craftReturnObj(undefined, errorMsg);
  }
  const returnObj: T = Object();

  for (const key in funcRules) {
    returnObj[key] = (data as T)[key];
  }

  return craftReturnObj(returnObj, errorMsg);
};

export const requiredWith = (fields: string[]) =>
  fields
    .map(
      (field, i, arr) =>
        `required_with:${field}${i < arr.length - 1 ? "|" : ""}`,
    )
    .join("");

export const ValidateFunc = (validator: Validator.Validator<any>) => {
  if (validator.passes()) return;

  const errorsObj = validator.errors.all();
  let errors: string[] = [];

  for (let key in errorsObj) {
    const keyErrors = errorsObj[key];
    errors = errors.concat(keyErrors);
  }

  if (errors.length === 0) return;

  throw new Error(errors[0]);
};
