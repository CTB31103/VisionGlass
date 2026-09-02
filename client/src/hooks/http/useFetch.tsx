import { CONSTANTS } from "@/Constants";
import { useRef } from "react";

type RequestOptions = {
  isFormData?: boolean;
  signal?: AbortSignal;
};

export type APIResponse<T> = {
  data: T | null;
  err: string | null;
};

const DEFAULT_HEADERS = {
  Accept: "application/json",
} as Record<string, string>;

export const useFetch = (props?: { authorization?: string | null }) => {
  const customHeaderRef = useRef<Record<string, string>>({});

  const fetchWithParams = async <T,>(
    to: string,
    method: "GET" | "PUT" | "POST" | "DELETE",
    body: unknown,
    customHeaders: Record<string, string> = {},
    { signal, isFormData }: RequestOptions = {},
  ): Promise<APIResponse<T>> => {
    const url = `http${CONSTANTS.api.isHttps() ? "s" : ""}://${CONSTANTS.api.hostname()}/${to[0] === "/" ? to.slice(1) : to}`;

    const abortSignal = signal ?? new AbortController().signal;
    const headers = { ...DEFAULT_HEADERS, ...customHeaders };
    let bodyToSend: BodyInit | null = null;

    try {
      if (["POST", "PUT"].includes(method) && body) {
        bodyToSend =
          isFormData && body instanceof FormData ? body : JSON.stringify(body);
        if (!isFormData) headers["Content-Type"] = "application/json";
        // headers["Content-Type"] = isFormData
        //   ? "multipart/form-data"
        //   : "application/json";
      }

      if (props?.authorization) {
        headers["Authorization"] = `Bearer ${props.authorization}`;
      }

      headers["vag-api-key"] = CONSTANTS.api.key();

      const res = await fetch(url, {
        method,
        headers,
        body: bodyToSend,
        signal: abortSignal,
        credentials: "include",
      });
      const json = await res.json();

      if (json.error) {
        return {
          data: null,
          err: json.error,
        };
      }

      return {
        data: json as T,
        err: null,
      };
    } catch (err) {
      return {
        data: null,
        err:
          typeof err === "string"
            ? err
            : err instanceof Error
              ? err.message
              : "Internal fetch error",
      };
    } finally {
      setCustomHeaders({});
    }
  };

  const setCustomHeaders = (header: Record<string, string>) => {
    customHeaderRef.current = header;
  };

  const get = async <T,>(
    apiEndpoint: string,
    signal?: AbortSignal,
  ): Promise<APIResponse<T>> => {
    return await fetchWithParams<T>(
      apiEndpoint,
      "GET",
      null,
      customHeaderRef.current,
      {
        isFormData: false,
        signal,
      },
    );
  };

  const post = async <T,>(
    apiEndpoint: string,
    body: unknown,
    options: RequestOptions = {},
  ): Promise<APIResponse<T>> => {
    return await fetchWithParams<T>(
      apiEndpoint,
      "POST",
      body,
      customHeaderRef.current,
      options,
    );
  };

  const put = async <T,>(
    apiEndpoint: string,
    body: unknown,
    options: RequestOptions = {},
  ): Promise<APIResponse<T>> => {
    return await fetchWithParams<T>(
      apiEndpoint,
      "PUT",
      body,
      customHeaderRef.current,
      options,
    );
  };

  const del = async <T,>(
    apiEndpoint: string,
    signal?: AbortSignal,
  ): Promise<APIResponse<T>> => {
    return await fetchWithParams<T>(
      apiEndpoint,
      "DELETE",
      null,
      customHeaderRef.current,
      {
        isFormData: false,
        signal,
      },
    );
  };

  return {
    setCustomHeaders,
    get,
    post,
    put,
    del,
  };
};
