import moment from "moment";
import { IRefreshToken } from "../interfaces";
import {
  getModelForClass,
  index,
  modelOptions,
  Prop,
} from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    collection: "RefreshTokens",
  },
})
@index({ userId: 1, token: 1 }, { unique: true })
export class RefreshToken implements IRefreshToken {
  @Prop({ type: String })
  token: string;
  @Prop({ type: String })
  userId: string;
  @Prop({ type: Number })
  expiresOn: number;

  constructor({ token, userId, expiresOn }: IRefreshToken) {
    this.token = token;
    this.userId = userId;
    this.expiresOn = expiresOn;
  }

  toRefreshToken() {
    return new RefreshToken(this);
  }

  toString() {
    return `Token(${this.token}) for ${this.userId} expires on ${moment(this.expiresOn).format("MMMM Do YYYY, h:mm:ss a")}`;
  }
}

export const RefreshTokenModel = getModelForClass(RefreshToken);
