import {
  getModelForClass,
  index,
  modelOptions,
  Prop,
} from "@typegoose/typegoose";
import { IUserStatistic } from "../interfaces";

@modelOptions({
  schemaOptions: {
    collection: "UserStatistics",
  },
})
@index({ userId: 1, userStatisticId: 1 }, { unique: true })
export class UserStatistic implements IUserStatistic {
  @Prop({ type: String, unique: true })
  userStatisticId: string;
  @Prop({ type: String, unique: true })
  userId: string;
  @Prop({ type: Number })
  monthOf: number;
  @Prop({ type: Number })
  currentCustomers: number;
  @Prop({ type: Number })
  monthsCustomers: number;
  @Prop({ type: Number })
  totalCustomers: number;

  constructor({
    userStatisticId,
    userId,
    monthOf,
    currentCustomers,
    monthsCustomers,
    totalCustomers,
  }: IUserStatistic) {
    this.userStatisticId = userStatisticId;
    this.userId = userId;
    this.monthOf = monthOf;
    this.currentCustomers = currentCustomers;
    this.monthsCustomers = monthsCustomers;
    this.totalCustomers = totalCustomers;
  }

  toUserStatistic() {
    return new UserStatistic(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}

export const UserStatisticModel = getModelForClass(UserStatistic);
