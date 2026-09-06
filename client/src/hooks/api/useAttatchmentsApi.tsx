import queryString from "query-string";
import { useAuthFetch, useHttpSignal } from "../http";
import type { IAttatchment } from "@/interfaces";

export const useAttatchmentsApi = () => {
  const { post, get } = useAuthFetch();
  const { getNewSignal } = useHttpSignal();

  const upload = async (files: FormData) => {
    return await post<{ attatchments: IAttatchment[] }>(
      `/api/media/upload`,
      files,
      {
        isFormData: true,
        signal: getNewSignal(`upload`),
      },
    );
  };

  const uploadFairs = async (files: FormData) => {
    return await post<{ success: boolean }>(`/api/media/fairs`, files, {
      isFormData: true,
      signal: getNewSignal(`uploadFairs`),
    });
  };

  const getAttatchments = async (data: {
    attatchmentIds?: string[];
    groupIds?: string[];
  }) => {
    return await get<{ attatchments: IAttatchment[] }>(
      `/api/media/attatchments?${queryString.stringify(data)}`,
      getNewSignal(`getAttatchments`),
    );
  };

  return {
    upload,
    getAttatchments,
    uploadFairs,
  };
};
