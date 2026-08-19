export const useCookieService = () => {
  const getCookie = (key: string) => {
    return window.cookieStore.get({ name: key });
  };
  const setCookie = (key: string, value: string) => {
    window.cookieStore.set(key, value);
  };
  const clearCookie = (key: string) => {
    window.cookieStore.delete(key);
  };
  return {
    getCookie,
    setCookie,
    clearCookie,
  };
};
