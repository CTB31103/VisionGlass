import type { ICustomerQuote } from "@/interfaces";
import { useState } from "react";
import { useApi } from "../api";
import { useTimeoutEffect } from "../utils";

export const useGetCustomerService = ({
  customerQuoteId,
  deps = [customerQuoteId],
  initialState,
}: {
  customerQuoteId?: string;
  deps?: (string | number | undefined)[];
  initialState?: {
    loading?: boolean;
    customer?: ICustomerQuote;
  };
} = {}) => {
  const {
    snackbar: [_, errorSnack],
    customerQuoteRoutes,
  } = useApi();

  const [loading, setLoading] = useState(initialState?.loading ?? false);
  const [customer, setCustomer] = useState<ICustomerQuote | undefined>(
    initialState?.customer ?? undefined,
  );

  const getCustomer = async (
    customerId: string,
    cb: (customer: ICustomerQuote) => void,
  ) => {
    setLoading(true);

    const res = await customerQuoteRoutes.getCustomer(customerId);
    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    cb(res.data.customer);
  };

  useTimeoutEffect(
    () => {
      if (!customerQuoteId || customerQuoteId.length === 0) return;
      getCustomer(customerQuoteId, (customer) => setCustomer(customer));
    },
    deps,
    50,
  );

  return {
    loading,

    customer,
    setCustomer,

    getCustomer,
  };
};
