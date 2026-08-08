import { Prop } from "@typegoose/typegoose";
import { ITimeBlock } from "../interfaces";

export class TimeBlock implements ITimeBlock {
  @Prop({ type: Number })
  from: number;
  @Prop({ type: Number })
  to: number;

  constructor({ from, to }: ITimeBlock) {
    this.from = from;
    this.to = to;
  }

  toTimeBlock() {
    return new TimeBlock(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}
