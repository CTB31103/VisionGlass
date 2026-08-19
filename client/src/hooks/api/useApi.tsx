import { useSnackbar } from "../utils";
import { useUserApi } from "./useUserApi";

export const useApi = () => {
  const snackbar = useSnackbar();
  const userRoutes = useUserApi();

  return {
    snackbar,
    userRoutes,
  };
};
