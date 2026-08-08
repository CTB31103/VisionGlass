import { Prop } from "@typegoose/typegoose";
import { IPerson } from "../interfaces";

export class Person implements IPerson {
  @Prop({ type: String })
  firstName: string;
  @Prop({ type: String })
  lastName: string;
  @Prop({ type: String })
  email: string;
  @Prop({ type: String })
  phone: string;

  constructor({ firstName, lastName, email, phone }: IPerson) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
  }

  static empty() {
    return new Person({ firstName: "", lastName: "", email: "", phone: "" });
  }

  toPerson() {
    return new Person(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}
