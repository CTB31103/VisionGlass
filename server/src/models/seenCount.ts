import {
  getModelForClass,
  ModelOptions,
  Prop,
  PropType,
} from "@typegoose/typegoose";
import { ISeenCount, ISeenGroup } from "../interfaces";
import { Log } from "../utils";

export class SeenGroup implements ISeenGroup {
  @Prop({ type: String })
  chatGroupId: string;
  @Prop({ type: Number })
  seenCount: number;

  constructor({ chatGroupId, seenCount }: ISeenGroup) {
    this.chatGroupId = chatGroupId;
    this.seenCount = seenCount;
  }

  toSeenGroup() {
    return new SeenGroup(this);
  }

  toString() {
    return Log.json(this);
  }
}

@ModelOptions({
  schemaOptions: {
    collection: "SeenCounts",
  },
})
export class SeenCount implements ISeenCount {
  @Prop({ type: String })
  userId: string;
  @Prop({ type: SeenGroup }, PropType.ARRAY)
  chatGroups: ISeenGroup[];

  constructor({ chatGroups, userId }: ISeenCount) {
    this.chatGroups = chatGroups;
    this.userId = userId;
  }

  toSeenCount() {
    return new SeenCount(this);
  }

  toString() {
    return Log.json(this);
  }
}

export const SeenCountModel = getModelForClass(SeenCount);
