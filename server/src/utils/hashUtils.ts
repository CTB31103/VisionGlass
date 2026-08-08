import Bcrypt from "bcryptjs";
import { Types } from "mongoose";

const rounds = 10;

const encrypt = async (msg: string) => {
  const salt = await Bcrypt.genSalt(rounds);
  const hashed = await Bcrypt.hash(msg, salt);
  return hashed;
};
const decrypt = async (hash: string, check: string) => {
  return await Bcrypt.compare(check, hash);
};

const uniqueId = () => {
  return new Types.ObjectId().toString();
};

export const HashUtils = {
  uniqueId,
  encrypt,
  decrypt,
};
