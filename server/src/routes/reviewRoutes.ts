import { Router } from "express";
import Controllers from "../controllers";

export const ReviewRoutes = Router();

ReviewRoutes.post(`/`, Controllers.ReviewController.createReview);

ReviewRoutes.get(`/`, Controllers.ReviewController.getReviews);
