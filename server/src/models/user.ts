import {
  getModelForClass,
  index,
  modelOptions,
  Prop,
} from "@typegoose/typegoose";
import { IClientUser, IPerson, IUser, UserType } from "../interfaces";
import { Person } from "./person";
import { ImageUtils } from "../utils";

@modelOptions({
  schemaOptions: {
    collection: "Users",
  },
})
@index({ userId: 1, username: 1 }, { unique: true })
export class User implements IUser {
  @Prop({ type: String, unique: true })
  userId: string;
  @Prop({ type: String, unique: true })
  username: string;
  @Prop({ type: String })
  password: string;
  @Prop({ type: String })
  userType: UserType;
  @Prop({ type: String })
  profilePictureId: string;
  @Prop({ type: Person, _id: false })
  info: IPerson;

  constructor({
    userId,
    username,
    password,
    userType,
    profilePictureId,
    info,
  }: IUser) {
    this.userId = userId;
    this.username = username;
    this.password = password;
    this.userType = userType;
    this.profilePictureId = profilePictureId;
    this.info = info;
  }

  toUser() {
    return new User(this);
  }

  toClientUser() {
    const user = this.toUser();
    user.profilePictureId = ImageUtils.toClientUrl(user.profilePictureId);
    return new ClientUser(user);
  }

  toString() {
    return JSON.stringify(this);
  }
}

class ClientUser implements IClientUser {
  userId: string;
  username: string;
  userType: UserType;
  profilePictureId: string;
  info: IPerson;

  constructor({
    userId,
    username,
    userType,
    profilePictureId,
    info,
  }: IClientUser) {
    this.userId = userId;
    this.username = username;
    this.userType = userType;
    this.profilePictureId = profilePictureId;
    this.info = info;
  }
}

export const UserModel = getModelForClass(User);
