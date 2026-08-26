export const useSessionService = () => {
  const getSessionValue = (key: string) => {
    return sessionStorage.get({ name: key });
  };
  const setSessionValue = (key: string, value: string) => {
    sessionStorage.set(key, value);
  };
  const clearSessionValue = (key: string) => {
    sessionStorage.removeItem(key);
  };
  return {
    getSessionValue,
    setSessionValue,
    clearSessionValue,
  };
};
