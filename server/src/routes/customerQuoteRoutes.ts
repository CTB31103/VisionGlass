import { Router } from "express";
import Controllers from "../controllers";

export const CustomerQuoteRoutes = Router();

CustomerQuoteRoutes.get("/", Controllers.CustomerQuoteController.getQuotes);

CustomerQuoteRoutes.post("/", Controllers.CustomerQuoteController.create);

CustomerQuoteRoutes.put(
  "/attatchments/:customerQuoteId",
  Controllers.CustomerQuoteController.toggleAttatchments,
);

CustomerQuoteRoutes.put(
  "/status/:customerQuoteId",
  Controllers.CustomerQuoteController.editStatus,
);

CustomerQuoteRoutes.put(
  "/team/:customerQuoteId",
  Controllers.CustomerQuoteController.toggleTeamMember,
);

CustomerQuoteRoutes.put(
  "/:customerQuoteId",
  Controllers.CustomerQuoteController.edit,
);

CustomerQuoteRoutes.get(
  "/:customerQuoteId",
  Controllers.CustomerQuoteController.getQuote,
);
