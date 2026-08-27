import CONSTANTS from "../constants";

const getPageLimit = (limit?: string) =>
  limit ? parseInt(limit) : CONSTANTS.pagination.default.limit;

const getPageNumber = (number?: string) =>
  number ? parseInt(number) : CONSTANTS.pagination.default.page;

export const ConditionalUtils = {
  getPageLimit,
  getPageNumber,
};
