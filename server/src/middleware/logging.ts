import { Log } from "../utils";
import MiddlewareFunc from "./middlewareFunc";

export const logging = MiddlewareFunc((req, res, next) => {
  Log.colors.purple(`Incoming Request:`);
  Log.log(`${req.method}:`, req.path);
  Log.log("Headers:", req.headers);
  Log.log("Query:", req.query);
  Log.space("Body:", req.body);
  next();
});
