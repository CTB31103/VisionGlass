import { Router } from "express";
import Middleware from "../middleware";
import UserRoutes from "./userRoutes";
import AccessKeyNeededRoutes from "./AccessKeyNeededRoutes";

const APIKeyNeededRoutes = Router();

APIKeyNeededRoutes.use(Middleware.apiAccess);

APIKeyNeededRoutes.use("/users", UserRoutes); // User related endpoints

APIKeyNeededRoutes.use("/", AccessKeyNeededRoutes);

export default APIKeyNeededRoutes;
