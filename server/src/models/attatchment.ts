import { getModelForClass, ModelOptions, Prop } from "@typegoose/typegoose";
import { IAttatchment } from "../interfaces";
import { Log } from "../utils";

@ModelOptions({
  schemaOptions: {
    collection: "Attatchments",
  },
})
export class Attatchment implements IAttatchment {
  @Prop({ type: String })
  attachmentId: string;
  @Prop({ type: Number })
  createdOn: number;
  @Prop({ type: String })
  groupId: string;
  @Prop({ type: String })
  createdBy: string;
  @Prop({ type: Boolean })
  isPrivate: boolean;

  constructor({
    attachmentId,
    createdOn,
    groupId,
    createdBy,
    isPrivate,
  }: IAttatchment) {
    this.attachmentId = attachmentId;
    this.createdOn = createdOn;
    this.groupId = groupId;
    this.createdBy = createdBy;
    this.isPrivate = isPrivate;
  }

  toAttatchment() {
    return new Attatchment(this);
  }

  toString() {
    return Log.json(this);
  }
}

export const AttatchmentModel = getModelForClass(Attatchment);
