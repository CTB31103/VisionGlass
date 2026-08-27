import type { IPerson } from "./person";

export interface IReview {
  reviewId: string;
  person: IPerson;

  rating: number;
  message: string;

  createdOn: number;
}
