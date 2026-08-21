import { useSnackbar } from "../utils";
import { useCalendarEventApi } from "./useCalendarEventApi";
import { useUserApi } from "./useUserApi";

export const useApi = () => {
  const snackbar = useSnackbar();
  const userRoutes = useUserApi();
  const calendarEventRoutes = useCalendarEventApi();

  return {
    snackbar,
    userRoutes,
    calendarEventRoutes,
  };
};
