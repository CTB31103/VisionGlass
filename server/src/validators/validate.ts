import Validatorjs from "validatorjs";
import { Log } from "../utils";

export type IRules = { [key: string]: string };

export const RULES = {
  string: "string",
  numeric: "numeric",
  boolean: "boolean",
  date: "date",

  required: "required",
  present: "present",
  array: "array",

  min: (len: number) => `min:${len}`,
  max: (len: number) => `max:${len}`,
  same: (attr: string) => `same:${attr}`,
  size: (len: number) => `size:${len}`,
  in: (vals: string[]) => `in:${vals.join(",")}`,
  multiple: (...params: string[]) => params.join("|"),
};

export const Validator = Validatorjs;

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
