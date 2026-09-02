import { useSnackbar } from "../utils";
import { useCalendarEventApi } from "./useCalendarEventApi";
import { useCustomerQuotesApi } from "./useCustomerQuotesApi";
import { useAttatchmentsApi } from "./useAttatchmentsApi";
import { useReviewApi } from "./useReviewApi";
import { useUserApi } from "./useUserApi";

export const useApi = () => {
  const snackbar = useSnackbar();
  const userRoutes = useUserApi();
  const calendarEventRoutes = useCalendarEventApi();
  const customerQuoteRoutes = useCustomerQuotesApi();
  const reviewRoutes = useReviewApi();
  const attatchmentRoutes = useAttatchmentsApi();

  return {
    snackbar,
    userRoutes,
    calendarEventRoutes,
    customerQuoteRoutes,
    reviewRoutes,
    attatchmentRoutes,
  };
};
