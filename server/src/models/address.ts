import { prop } from "@typegoose/typegoose";
import { IAddress } from "../interfaces";

export class Address implements IAddress {
  @prop({ type: String })
  street: string;
  @prop({ type: String })
  city: string;
  @prop({ type: String })
  zip: string;
  @prop({ type: String })
  state: string;
  @prop({ type: String })
  country: string;
  @prop({ type: Number })
  lat: number;
  @prop({ type: Number })
  lng: number;

  constructor({ street, city, zip, state, country, lat, lng }: IAddress) {
    this.street = street;
    this.city = city;
    this.zip = zip;
    this.state = state;
    this.country = country;
    this.lat = lat;
    this.lng = lng;
  }

  toAddress() {
    return new Address(this);
  }

  toString() {
    return `${this.street} ${this.city}, ${this.state} ${this.zip}, ${this.country}`;
  }
}
