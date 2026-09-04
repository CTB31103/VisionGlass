import { Router } from "express";
import Middleware from "../middleware";
import { UserRoutes } from "./userRoutes";
import { AccessKeyNeededRoutes } from "./AccessKeyNeededRoutes";
import { ReviewRoutes } from "./reviewRoutes";
import Controllers from "../controllers";

export const APIKeyNeededRoutes = Router();

APIKeyNeededRoutes.use(Middleware.apiAccess);

APIKeyNeededRoutes.post(
  "/quote",
  Controllers.CustomerQuoteController.createWithNoTeam,
);

APIKeyNeededRoutes.use("/reviews", ReviewRoutes);

APIKeyNeededRoutes.use("/users", UserRoutes); // User related endpoints

APIKeyNeededRoutes.use("/", AccessKeyNeededRoutes);
