import { Router } from "express";
import Controllers from "../controllers";
import Middleware from "../middleware";

const UserRoutes = Router();
const UserAuthRoutes = Router();

UserRoutes.get("/", Controllers.UserController.getUsers);

UserRoutes.post("/", Controllers.UserController.createUser);

UserRoutes.post("/login", Controllers.UserController.loginUser);

UserRoutes.get("/refresh", Controllers.UserController.refreshUser);

// End non-authenticated usage
UserRoutes.use("/", UserAuthRoutes);

UserAuthRoutes.use(Middleware.accessKeyOnly);

UserAuthRoutes.put("/", Controllers.UserController.editUser);

UserAuthRoutes.get("/logout", Controllers.UserController.logoutUser);

UserAuthRoutes.get("/login", Controllers.UserController.loginUserWithKey);

export default UserRoutes;
