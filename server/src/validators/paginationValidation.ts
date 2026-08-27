import { RULES, validationV2 } from "./validate";

const paginatedQuery = (data: any) => {
  return validationV2<{
    pageLimit?: string;
    pageNumber?: string;
  }>(
    {
      pageLimit: [RULES.common.optionalString, ""],
      pageNumber: [RULES.common.optionalString, ""],
    },
    data,
  );
};

export const PaginationValidation = {
  paginatedQuery,
};
