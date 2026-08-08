export const useCookieService = () => {
  const getCookie = (key: string) => {
    return window.sessionStorage.getItem(key);
  };
  const setCookie = (key: string, value: string) => {
    window.sessionStorage.setItem(key, value);
  };
  const clearCookie = (key: string) => {
    window.sessionStorage.removeItem(key);
  };
  return {
    getCookie,
    setCookie,
    clearCookie,
  };
};
