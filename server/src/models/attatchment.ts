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

  constructor({ attachmentId, createdOn, groupId }: IAttatchment) {
    this.attachmentId = attachmentId;
    this.createdOn = createdOn;
    this.groupId = groupId;
  }

  toAttatchment() {
    return new Attatchment(this);
  }

  toString() {
    return Log.json(this);
  }
}

export const AttatchmentModel = getModelForClass(Attatchment);
