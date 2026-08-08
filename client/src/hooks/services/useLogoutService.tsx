import { useCookieService } from "./useCookieService";
import { TOKEN_KEYS } from "@/Constants";
import { useAccessKeyStore, useUserStore } from "@/stores";
import { useApi } from "../api";

export const useLogoutService = () => {
  const { clearCooke } = useCookieService();
  const {
    userRoutes: { logout: logoutApi },
  } = useApi();
  const setAccessKey = useAccessKeyStore((state) => state.setAccessKey);
  const logoutUserStore = useUserStore((state) => state.logout);
  const logout = async () => {
    await logoutApi();
    clearCooke(TOKEN_KEYS.ACCESS_KEY);
    clearCooke(TOKEN_KEYS.REFRESH_KEY);
    setAccessKey(null);
    logoutUserStore();
  };
  return logout;
};
