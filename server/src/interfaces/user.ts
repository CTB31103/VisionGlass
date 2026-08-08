import { IPerson } from "./person";

export enum UserType {
  ADMIN = "admin",
  TECH = "technician",
  SALES = "sales",
}

export interface IUser {
  userId: string;
  username: string;
  password: string;
  userType: UserType;
  profilePictureId: string;
  info: IPerson;
}

export interface IClientUser extends Omit<IUser, "password"> {}
