import { useTimeoutEffect } from "./useTimeoutEffect";
import { useAccessKeyStore } from "@/stores";

export const useRefreshEffect = (
  cb: () => void,
  deps: unknown[] = [],
  delay: number = 250,
) => {
  const accessToken = useAccessKeyStore((state) => state.accessKey);
  useTimeoutEffect(
    () => {
      const timeout = setTimeout(cb, delay);
      return () => {
        clearTimeout(timeout);
      };
    },
    [...deps, accessToken],
    delay,
  );
};
