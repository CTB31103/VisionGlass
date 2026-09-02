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
  const { get, post, put } = useAuthFetch();
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

  const getCustomer = async (customerQuoteId: string) => {
    return await get<{ customer: ICustomerQuote }>(
      `/api/customer-quotes/${customerQuoteId}`,
      getNewSignal(`getCustomer`),
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
    return await post<{ customer: ICustomerQuote }>(
      `/api/customer-quotes`,
      data,
      { signal: getNewSignal(`createCustomerQuoteService`) },
    );
  };

  const editStatus = async (
    customer: ICustomerQuote,
    status: ICustomerQuote["status"],
  ) => {
    return await put<{ customer: ICustomerQuote }>(
      `/api/customer-quotes/status/${customer.customerQuoteId}`,
      { customerQuoteId: customer.customerQuoteId, status },
      { signal: getNewSignal(`editStatus`) },
    );
  };

  const editNotes = async (customer: ICustomerQuote, notes: string) => {
    return await put<{ customer: ICustomerQuote }>(
      `/api/customer-quotes/${customer.customerQuoteId}`,
      { ...customer, forceStatus: true, notes },
    );
  };

  const edit = async (customer: ICustomerQuote) => {
    return await put<{ customer: ICustomerQuote }>(
      `/api/customer-quotes/${customer.customerQuoteId}`,
      customer,
    );
  };

  const toggleTeamMember = async (customerQuoteId: string, userId: string) => {
    return await put<{ customer: ICustomerQuote }>(
      `/api/customer-quotes/team/${customerQuoteId}`,
      { userId, customerQuoteId },
    );
  };

  const toggleAttatchments = async (
    customerQuoteId: string,
    data: { attatchmentIds: string[]; deleteAttatchment?: boolean },
  ) => {
    return await put<{ customer: ICustomerQuote }>(
      `/api/customer-quotes/attatchments/${customerQuoteId}`,
      data,
    );
  };

  return {
    getAllCustomers,
    getCustomer,
    editStatus,
    editNotes,
    search,
    createCustomerQuoteService,
    edit,
    toggleTeamMember,
    toggleAttatchments,
  };
};
