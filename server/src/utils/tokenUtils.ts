import CONSTANTS from "../constants";
import jwt, { JwtPayload } from "jsonwebtoken";
import Validators from "../validators";

export type JWTPayload = {
  id: string;
  role: string;
  createdOn: number;
};

const signJWTToken = (
  payload: Omit<JWTPayload, "createdOn">,
  type: "long" | "short",
) => {
  const jwtKey = CONSTANTS.auth.jwt.secret();
  const options: jwt.SignOptions = {
    expiresIn: type === "long" ? "7d" : "1h", // Token expires in 1 hour
  };

  const token = jwt.sign(
    { ...payload, createdOn: new Date().getTime() },
    jwtKey,
    options,
  );

  return token;
};

const decodeJWTToken = async (token: string) => {
  const payload = jwt.verify(token, CONSTANTS.auth.jwt.secret()) as JwtPayload &
    JWTPayload;

  Validators.TokenValidators.tokenPayload(payload);

  return payload as JwtPayload & JWTPayload;
};

export const TokenUtils = {
  signJWTToken,
  decodeJWTToken,
};
