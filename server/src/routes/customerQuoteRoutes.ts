import { Router } from "express";
import Controllers from "../controllers";

export const CustomerQuoteRoutes = Router();

CustomerQuoteRoutes.post("/", Controllers.CustomerQuoteController.create);
