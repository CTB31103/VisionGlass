import { Router } from "express";
import Controllers from "../controllers";
import Middleware from "../middleware";

export const MediaRoutes = Router();

MediaRoutes.get("/attatchments", Controllers.MediaController.getAttatchments);

MediaRoutes.get(
  "/serve/:imageName",
  Middleware.apiAccess,
  Middleware.accessKeyOnly,
  Controllers.MediaController.serveImage,
);

MediaRoutes.post(
  "/upload",
  Middleware.apiAccess,
  Middleware.accessKeyOnly,
  Middleware.DiskSpaceMiddleware,
  Middleware.upload.array("files", 5),
  Controllers.MediaController.upload,
);

MediaRoutes.get(
  "/fairs",

  Controllers.MediaController.serveFairsSchedule,
);

MediaRoutes.post(
  "/fairs",
  Middleware.apiAccess,
  Middleware.accessKeyOnly,
  Middleware.DiskSpaceMiddleware,
  Middleware.upload.single("file"),
  Controllers.MediaController.uploadFairSchedule,
);
