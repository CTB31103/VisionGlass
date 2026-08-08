import { accessKeyOnly } from "./accessKeyOnly";
import { apiAccess } from "./apiAccess";
import { logging } from "./logging";
import { upload } from "./upload";

const Middleware = {
  apiAccess,
  logging,
  accessKeyOnly,
  upload,
};

export default Middleware;
