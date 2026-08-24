import { useSnackbar } from "../utils";
import { useCalendarEventApi } from "./useCalendarEventApi";
import { useCustomerQuotesApi } from "./useCustomerQuotesApi";
import { useUserApi } from "./useUserApi";

export const useApi = () => {
  const snackbar = useSnackbar();
  const userRoutes = useUserApi();
  const calendarEventRoutes = useCalendarEventApi();
  const customerQuoteRoutes = useCustomerQuotesApi();

  return {
    snackbar,
    userRoutes,
    calendarEventRoutes,
    customerQuoteRoutes,
  };
};
