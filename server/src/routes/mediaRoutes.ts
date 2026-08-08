import { Router } from "express";
import Controllers from "../controllers";
import Middleware from "../middleware";

const MediaRoutes = Router();

MediaRoutes.get("/serve/:imageName", Controllers.MediaController.serveImage);

MediaRoutes.post(
  "/upload",
  Middleware.apiAccess,
  Middleware.accessKeyOnly,
  Middleware.upload.array("IMAGES_V1", 5),
  Controllers.MediaController.upload,
);

export default MediaRoutes;
