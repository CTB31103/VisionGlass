import mongoose from "mongoose";
import { HashUtils, ISession, Log } from "../utils";
import { UserModel } from "../models";
import { UserType } from "../interfaces";

export const ROOT_USERNAME = "root";

export const createAdmin = async () => {
  await UserModel.create([
    {
      userId: HashUtils.uniqueId(),
      info: {
        firstName: ROOT_USERNAME,
        lastName: "",
        email: "",
        phone: "",
      },
      password: await HashUtils.encrypt(ROOT_USERNAME),
      username: ROOT_USERNAME,
      userType: UserType.ADMIN,
      isRootUser: true,
    },
  ]);
  Log.colors.green(`Admin account created`);
  Log.log(``);
};

export const getAdmin = async (session?: ISession) => {
  const admin = session
    ? await UserModel.find({ username: ROOT_USERNAME }).session(session)
    : await UserModel.find({ username: ROOT_USERNAME });
  if (!admin || admin.length === 0) throw new Error(`Could not find admin`);

  return admin[0];
};
