import queryString from "query-string";
import { useAuthFetch, useHttpSignal } from "..";
import type { ICustomerQuote } from "@/interfaces";

export const useCustomerQuotesApi = () => {
  const { get, post } = useAuthFetch();
  const { getNewSignal } = useHttpSignal();

  const getAllCustomers = async () => {
    return await get<{ customerQuotes: ICustomerQuote[] }>(
      `/api/customer-quotes`,
      getNewSignal(`getAllCustomers`),
    );
  };

  const search = async (query: string) => {
    return await get<{ customerQuotes: ICustomerQuote[] }>(
      `/api/customer-quotes?` + queryString.stringify({ query }),
      getNewSignal(`getAllCustomers`),
    );
  };

  const createCustomerQuoteService = async (
    data: Omit<
      Omit<Omit<ICustomerQuote, "customerQuoteId">, "teamMembers">,
      "status"
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
