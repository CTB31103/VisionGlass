import checkDiskSpace from "check-disk-space";
import { Log, TryCatch } from "../utils";
import MiddlewareFunc from "./middlewareFunc";

export const DiskSpaceMiddleware = MiddlewareFunc(
  async (req, res, next) =>
    await TryCatch(
      async () => {
        // Check the disk path (e.g., '/' on Linux or 'C:/' on Windows)
        const diskSpace = await checkDiskSpace("/");

        // Example threshold: Block uploads if free space is under 100MB
        const MIN_FREE_SPACE = 100 * 1024 * 1024;

        if (diskSpace.free < MIN_FREE_SPACE) {
          return res.status(507).json({
            error: "Storage low",
            message: "Uploads are temporarily disabled due to low disk space.",
          });
        }

        next();
      },
      (err) => {
        Log.colors.red(`Disk space check failed`);
        Log.log(``);

        // If disk check fails, proceed with caution or log it
        next();
      },
    ),
);
