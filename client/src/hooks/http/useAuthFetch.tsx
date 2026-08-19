import { useAccessKeyStore } from "@/stores";
import { useFetch } from "./useFetch";
import { useEffect } from "react";

export const useAuthFetch = () => {
  const userApiAccessKey = useAccessKeyStore((state) => state.accessKey);
  const fetchHook = useFetch({ authorization: userApiAccessKey });

  useEffect(() => {
    console.log(`Use Auth Fetch: ${userApiAccessKey}`);
    console.log(``);
  }, [userApiAccessKey]);
  return fetchHook;
};
