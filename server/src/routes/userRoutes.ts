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

UserAuthRoutes.post("/", Controllers.UserController.createUser);

UserAuthRoutes.get("/access", Controllers.UserController.userHasAccess);

UserAuthRoutes.get("/logout", Controllers.UserController.logoutUser);

UserAuthRoutes.get(
  "/login",
  Controllers.UserController.loginUserWithAccessToken,
);

UserAuthRoutes.post(
  "/:userId/verification",
  Controllers.UserController.verifyPassword,
);

UserAuthRoutes.put(
  "/:userId/authentication",
  Controllers.UserController.changePassword,
);

UserAuthRoutes.get("/:userId", Controllers.UserController.getUser);

UserAuthRoutes.put("/:userId", Controllers.UserController.editUser);

UserAuthRoutes.delete("/:userId", Controllers.UserController.deleteUser);
