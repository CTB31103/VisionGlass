import { toString } from "@/utils";
import { useState } from "react";
import { useTimeoutEffect } from "./useTimeoutEffect";

const DEFAULT_HEADERS = {
  // Accept: "application/json",
} as Record<string, string>;

export const useImageFetch = (
  url: string,
  options?: { headers?: { [key: string]: string } },
) => {
  const [imageSrc, setImageSrc] = useState(url);

  const getImage = async () => {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { ...DEFAULT_HEADERS, ...(options?.headers ?? {}) },
        credentials: "include",
      });

      if (!res.ok) throw new Error(`Could not get image`);

      const blob = await res.blob();
      setImageSrc(URL.createObjectURL(blob));
    } catch (err) {
      console.log(`Could not get image: ${url}`);
      console.log(err);
      console.log(``);
      setImageSrc(url);
    }
  };

  useTimeoutEffect(() => {
    if (url.length === 0) return;
    getImage();
  }, [url, toString(options)]);

  return imageSrc;
};
