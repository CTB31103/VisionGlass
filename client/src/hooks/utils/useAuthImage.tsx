import { useEffect, useState } from "react";
import { useImageFetch } from "./useImageFetch";
import { CONSTANTS, TOKEN_KEYS } from "@/Constants";
import { useAccessKeyStore } from "@/stores";

export const useAuthImage = (imageName?: string) => {
  const accessKey = useAccessKeyStore((state) => state.accessKey);
  const [headers, setHeaders] = useState<Record<string, string>>({});
  const imageSrc = useImageFetch(
    imageName ? CONSTANTS.api.image(imageName) : "",
    {
      headers,
    },
  );

  useEffect(() => {
    setHeaders(() => {
      const headers: Record<string, string> = {};

      headers[TOKEN_KEYS.API_KEY] = CONSTANTS.api.key();
      headers["Authorization"] = `Bearer ${accessKey}`;

      return headers;
    });
  }, [accessKey]);

  return imageSrc;
};
