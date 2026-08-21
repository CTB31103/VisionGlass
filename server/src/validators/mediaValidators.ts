import { ValidateFunc, Validator } from "./validate";

const includesImageName = (params: any) => {
  const rules = {
    imageName: "required|string",
  };

  const validator = new Validator(params, rules);
  ValidateFunc(validator);

  return params.imageName as string;
};

export const MediaValidators = {
  includesImageName,
};
