import { useUserApi } from "./useUserApi";

export const useApi = () => {
  const userRoutes = useUserApi();

  return {
    userRoutes,
  };
};
