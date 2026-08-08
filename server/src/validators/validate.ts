import Validator from "validatorjs";
import { Log } from "../utils";

export const requiredWith = (fields: string[]) =>
  fields
    .map(
      (field, i, arr) =>
        `required_with:${field}${i < arr.length - 1 ? "|" : ""}`,
    )
    .join("");

const ValidateFunc = (validator: Validator.Validator<any>) => {
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

export default ValidateFunc;
