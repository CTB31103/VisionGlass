import { useState } from "react";
import { useApi } from "../api";
import type { ICustomerQuote } from "@/interfaces";

export const useDeleteCustomerAttatchment = () => {
  const {
    snackbar: [_, errorSnack],
    customerQuoteRoutes,
  } = useApi();

  const [loading, setLoading] = useState(false);

  const onDeleteCustomerAttatchment = async (
    customerQuoteId: string,
    attatchmentId: string,
    cb: (customer: ICustomerQuote) => void,
  ) => {
    setLoading(true);

    const res = await customerQuoteRoutes.toggleAttatchments(customerQuoteId, {
      attatchmentIds: [attatchmentId],
      deleteAttatchment: true,
    });
    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    cb(res.data.customer);
  };

  return {
    loading,
    onDeleteCustomerAttatchment,
  };
};
