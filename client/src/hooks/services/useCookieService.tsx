import {
  getCookie as tsGetCookie,
  setCookie as tsSetCookie,
  removeCookie as tsRemoveCookie,
} from "typescript-cookie";

export const useCookieService = () => {
  const getCookie = (key: string) => {
    return tsGetCookie(key);
  };
  const setCookie = (key: string, value: string) => {
    tsSetCookie(key, value);
  };
  const clearCookie = (key: string) => {
    tsRemoveCookie(key);
  };
  return {
    getCookie,
    setCookie,
    clearCookie,
  };
};
