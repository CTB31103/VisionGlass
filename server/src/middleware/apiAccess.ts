import MiddlewareFunc from "./middlewareFunc";
import CONSTANTS from "../constants";
import { Log } from "../utils";

export const apiAccess = MiddlewareFunc((req, res, next) => {
  const apiKey = req.headers[CONSTANTS.server.headerAPIKey] as
    | string
    | undefined;

  if (req.method === "OPTIONS") {
    next();
  }

  if (!apiKey) {
    Log.colors.redSpace("API key is missing");
    return res.status(401).json({ error: "API key is missing" });
  }

  if (apiKey !== CONSTANTS.server.apiAccessKey()) {
    Log.colors.redSpace("API key is invalid");
    return res.status(403).json({ error: "Invalid API key" });
  }

  next();
});
