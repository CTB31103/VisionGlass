import { Router } from "express";
import Middleware from "../middleware";
import { UserRoutes } from "./userRoutes";
import { AccessKeyNeededRoutes } from "./AccessKeyNeededRoutes";
import { ReviewRoutes } from "./reviewRoutes";

export const APIKeyNeededRoutes = Router();

APIKeyNeededRoutes.use(Middleware.apiAccess);

APIKeyNeededRoutes.use("/reviews", ReviewRoutes);

APIKeyNeededRoutes.use("/users", UserRoutes); // User related endpoints

APIKeyNeededRoutes.use("/", AccessKeyNeededRoutes);
