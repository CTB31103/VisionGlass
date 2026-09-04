import {
  getModelForClass,
  index,
  modelOptions,
  mongoose,
  plugin,
  Prop,
  ReturnModelType,
} from "@typegoose/typegoose";
import { IPerson, IReview } from "../interfaces";
import { Person } from "./person";
import mongoosePaginate from "mongoose-paginate-v2";
import { MongoDoc } from "./mongoDoc";

@modelOptions({
  schemaOptions: { collection: "Reviews" },
})
@plugin(mongoosePaginate)
export class Review implements IReview {
  @Prop({ type: String, unique: true })
  reviewId: string;
  @Prop({ type: Person, _id: false })
  person: IPerson;
  @Prop({ type: Number })
  rating: number;
  @Prop({ type: Number })
  createdOn: number;
  @Prop({ type: String })
  message: string;

  constructor({ reviewId, person, rating, message, createdOn }: IReview) {
    this.reviewId = reviewId;
    this.person = new Person(person);
    this.rating = rating;
    this.message = message;
    this.createdOn = createdOn;
  }

  toReview() {
    return new Review(this);
  }
}

type ReviewModel = ReturnModelType<typeof Review> &
  Pick<mongoose.PaginateModel<MongoDoc<Review>>, "paginate">;

export const ReviewModel = getModelForClass(Review) as ReviewModel;
