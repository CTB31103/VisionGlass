import queryString from "query-string";
import { useAuthFetch, useHttpSignal } from "../http";
import type { IReview } from "@/interfaces";
import type { IPaginationOptions, IPaginationResult } from "../types";
import { DEFAULT_PAGINATION_OPTION } from "@/Constants";

export const useReviewApi = () => {
  const { get, post } = useAuthFetch();
  const { getNewSignal } = useHttpSignal();

  const getReviews = async (
    query: {
      sortBy?: string;
      query?: string;
    } & IPaginationOptions = DEFAULT_PAGINATION_OPTION,
  ) => {
    return await get<{ reviews: IReview[] } & IPaginationResult>(
      `/api/reviews?${queryString.stringify(query)}`,
      getNewSignal(`getReviews`),
    );
  };

  const create = async (data: Omit<Omit<IReview, "reviewId">, "createdOn">) => {
    return await post<{ review: IReview }>(`/api/reviews`, data, {
      signal: getNewSignal("create"),
    });
  };

  return {
    create,
    getReviews,
  };
};
