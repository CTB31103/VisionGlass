import { Router } from "express";
import Controllers from "../controllers";
import Middleware from "../middleware";

export const UserRoutes = Router();
const UserAuthRoutes = Router();

UserRoutes.post("/login", Controllers.UserController.loginUser);

UserRoutes.get(
  "/refresh",
  Controllers.UserController.refreshUserWithRefreshToken,
);

// Begin Authenticated routes
UserRoutes.use("/", UserAuthRoutes);
UserAuthRoutes.use(Middleware.accessKeyOnly);
//

UserAuthRoutes.get("/", Controllers.UserController.getUsers);

UserRoutes.post("/", Controllers.UserController.createUser);

UserAuthRoutes.put("/", Controllers.UserController.editUser);

UserAuthRoutes.get("/search", Controllers.UserController.searchUsers);

UserAuthRoutes.get("/access", Controllers.UserController.userHasAccess);

UserAuthRoutes.get("/logout", Controllers.UserController.logoutUser);

UserAuthRoutes.get(
  "/login",
  Controllers.UserController.loginUserWithAccessToken,
);
