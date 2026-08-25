import mongoose from "mongoose";
import { HashUtils, Log } from "../utils";
import { UserModel } from "../models";
import { UserType } from "../interfaces";

export const createAdmin = async () => {
  await UserModel.create([
    {
      userId: HashUtils.uniqueId(),
      info: {
        firstName: "admin",
        lastName: "",
        email: "",
        phone: "",
      },
      password: await HashUtils.encrypt("admin"),
      username: "admin",
      userType: UserType.ADMIN,
    },
  ]);
  Log.colors.green(`Admin account created`);
  Log.log(``);
};

export const getAdmin = async () => {
  const admin = await UserModel.find({ username: "admin" });
  if (!admin || admin.length === 0) throw new Error(`Could not find admin`);

  return admin[0];
};
