import queryString from "query-string";
import {
  useAuthFetch,
  useHttpSignal,
  type IPaginationOptions,
  type IPaginationResult,
} from "..";
import type { ICustomerQuote } from "@/interfaces";
import { DEFAULT_PAGINATION_OPTION } from "@/Constants";

export const useCustomerQuotesApi = () => {
  const { get, post } = useAuthFetch();
  const { getNewSignal } = useHttpSignal();

  const getAllCustomers = async (
    queryParams: IPaginationOptions & {
      status?: ICustomerQuote["status"][];
      employee?: string;
      scheduledDate?: number;
      createdAfter?: number;
      createdBefore?: number;
    } = DEFAULT_PAGINATION_OPTION,
  ) => {
    return await get<{ customerQuotes: ICustomerQuote[] } & IPaginationResult>(
      `/api/customer-quotes?` + queryString.stringify(queryParams),
      getNewSignal(`getAllCustomers`),
    );
  };

  const search = async (
    query: string,
    queryParams: IPaginationOptions = DEFAULT_PAGINATION_OPTION,
  ) => {
    return await get<{ customerQuotes: ICustomerQuote[] } & IPaginationResult>(
      `/api/customer-quotes?` +
        queryString.stringify({ query, ...queryParams }),
      getNewSignal(`getAllCustomers`),
    );
  };

  const createCustomerQuoteService = async (
    data: Omit<
      Omit<
        Omit<Omit<ICustomerQuote, "customerQuoteId">, "teamMembers">,
        "status"
      >,
      "createdOn"
    >,
  ) => {
    return await post<{ customerQuote: ICustomerQuote }>(
      `/api/customer-quotes`,
      data,
      { signal: getNewSignal(`createCustomerQuoteService`) },
    );
  };

  return {
    getAllCustomers,
    search,
    createCustomerQuoteService,
  };
};
