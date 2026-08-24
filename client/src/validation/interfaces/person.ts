import type { IPerson } from "@/interfaces";
import { RULES, validation } from "../validation";

export const validatePerson = (data: unknown) => {
  const validPerson = validation<IPerson>(
    {
      firstName: [RULES.common.requiredString, "first name"],
      lastName: [RULES.common.requiredString, "last name"],
      email: [RULES.common.optionalString, ""],
      phone: [RULES.common.requiredString, ""],
    },
    data,
  );

  return validPerson;
};
