import { useAccessKeyStore } from "@/stores";
import { useFetch } from "./useFetch";

export const useAuthFetch = () => {
  const userApiAccessKey = useAccessKeyStore((state) => state.accessKey);
  const fetchHook = useFetch({ authorization: userApiAccessKey });

  return fetchHook;
};
