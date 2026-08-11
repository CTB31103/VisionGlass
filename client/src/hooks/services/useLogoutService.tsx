import { useCookieService } from "./useCookieService";
import { TOKEN_KEYS } from "@/Constants";
import { useAccessKeyStore, useUserStore } from "@/stores";
import { useApi } from "../api";

export const useLogoutService = () => {
  const { clearCookie } = useCookieService();
  const {
    userRoutes: { logout: logoutApi },
  } = useApi();
  const setAccessKey = useAccessKeyStore((state) => state.setAccessKey);
  const logoutUserStore = useUserStore((state) => state.logout);
  const logout = async () => {
    await logoutApi();
    clearCookie(TOKEN_KEYS.ACCESS_KEY);
    clearCookie(TOKEN_KEYS.REFRESH_KEY);
    setAccessKey(null);
    logoutUserStore();
  };
  return logout;
};
