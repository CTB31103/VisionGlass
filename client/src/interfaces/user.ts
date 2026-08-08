import type { IPerson } from "./person";

export const UserType = {
  ADMIN: "admin",
  TECH: "technician",
  SALES: "sales",
} as const;

export type UserType = (typeof UserType)[keyof typeof UserType];

export interface IUser {
  userId: string;
  username: string;
  userType: UserType;
  profilePictureId: string;
  info: IPerson;
}
