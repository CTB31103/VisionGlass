import { IPerson, IReview } from "../interfaces";
import { requiredWith, RULES, validationV2 } from "./validate";

const getReviews = (data: any) => {
  return validationV2<{
    sortBy?: string;
    from?: string;
    to?: string;
    query?: string;
  }>(
    {
      from: [
        RULES.multiple(RULES.common.optionalString, requiredWith(["to"])),
        "",
      ],
      to: [RULES.common.optionalString, ""],
      sortBy: [RULES.common.optionalString, ""],
      query: [RULES.common.optionalString, ""],
    },
    data,
  );
};

const create = (data: any) => {
  const validReview = validationV2<
    Omit<Omit<Omit<IReview, "reviewId">, "person">, "createdOn">
  >(
    {
      message: [
        RULES.multiple(RULES.common.requiredString, RULES.max(500)),
        "",
      ],
      rating: [
        RULES.multiple(RULES.common.requiredNumber, RULES.min(0), RULES.max(5)),
        "",
      ],
    },
    data,
  );

  const validPerson = validationV2<IPerson>(
    {
      firstName: [RULES.common.requiredString, "name"],
      lastName: [RULES.common.presentString, "name"],
      email: [RULES.common.presentString, ""],
      phone: [RULES.common.presentString, ""],
    },
    data.person,
  );

  if (validPerson.errorMsg || !validPerson.validData)
    throw new Error(validPerson.errorMsg);

  if (validReview.errorMsg || !validReview.validData)
    throw new Error(validReview.errorMsg);
  return data as Omit<IReview, "reviewId">;
};

export const ReviewControllerValidators = {
  create,
  getReviews,
};
