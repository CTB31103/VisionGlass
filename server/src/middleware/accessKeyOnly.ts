import { Log, TokenUtils, TryCatch } from "../utils";
import Validators from "../validators";
import MiddlewareFunc from "./middlewareFunc";

export const accessKeyOnly = MiddlewareFunc((req, res, next) =>
  TryCatch(
    async () => {
      const bearerToken = Validators.TokenValidators.bearerTokenPresent(
        req.headers,
      );
      const decoded = await TokenUtils.decodeJWTToken(bearerToken);

      res.locals.userId = decoded.id;
      res.locals.role = decoded.role;
      next();
    },
    (err) => res.status(401).json({ error: err }),
  ),
);
