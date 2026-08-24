import { useAuthFetch } from "..";
import type { ICustomerQuote } from "@/interfaces";

export const useCustomerQuotesApi = () => {
  const { post } = useAuthFetch();
  // const { getNewSignal, abortSignal } = useHttpSignal();

  const createCustomerQuoteService = async (
    data: Omit<
      Omit<Omit<ICustomerQuote, "customerQuoteId">, "teamMembers">,
      "status"
    >,
  ) => {
    return await post<{ customerQuote: ICustomerQuote }>(
      `/api/customer-quotes`,
      data,
    );
  };

  return {
    createCustomerQuoteService,
  };
};
