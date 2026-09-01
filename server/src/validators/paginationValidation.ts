import { ConditionalUtils } from "../utils";
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

const getPaginatedQuery = (data: any) => {
  const { validData: validPagination, errorMsg: paginationErr } =
    paginatedQuery(data);
  const pageNumber = ConditionalUtils.getPageNumber(
    validPagination?.pageNumber,
  );
  const pageLimit = ConditionalUtils.getPageLimit(validPagination?.pageLimit);
  return {
    pageNumber,
    pageLimit,
  };
};

export const PaginationValidation = {
  paginatedQuery,
  getPaginatedQuery,
};
