import { Router } from "express";
import Controllers from "../controllers";

export const CustomerQuoteRoutes = Router();

CustomerQuoteRoutes.get("/", Controllers.CustomerQuoteController.getQuotes);

CustomerQuoteRoutes.post("/", Controllers.CustomerQuoteController.create);
