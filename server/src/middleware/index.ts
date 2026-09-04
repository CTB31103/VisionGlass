import { accessKeyOnly } from "./accessKeyOnly";
import { apiAccess } from "./apiAccess";
import { DiskSpaceMiddleware } from "./diskSpaceMiddleware";
import { logging } from "./logging";
import { upload } from "./upload";

const Middleware = {
  apiAccess,
  logging,
  accessKeyOnly,
  upload,
  DiskSpaceMiddleware,
};

export default Middleware;
