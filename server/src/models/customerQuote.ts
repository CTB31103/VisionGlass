import { Prop } from "@typegoose/typegoose";
import {
  CarDamageLocation,
  CustomerQuoteStatus,
  DamageSize,
  IAddress,
  ICar,
  ICarDamage,
  ICarPlate,
  ICustomerQuote,
  IPerson,
  ITimeBlock,
  PackageType,
  PaymentType,
  WindowSide,
} from "../interfaces";
import { Person } from "./person";
import { Address } from "./address";
import { TimeBlock } from "./timeBlock";

export class CarPlate implements ICarPlate {
  @Prop({ type: String })
  plate: string;
  @Prop({ type: String })
  zip: string;

  constructor({ plate, zip }: ICarPlate) {
    this.plate = plate;
    this.zip = zip;
  }

  toCarPlate() {
    return new CarPlate(this);
  }

  toString() {
    return `${this.plate} ${this.zip}`;
  }
}

export class Car implements ICar {
  @Prop({ type: String })
  make: string;
  @Prop({ type: String })
  model: string;
  @Prop({ type: String })
  vin: string;
  @Prop({ type: CarPlate })
  plateInfo: ICarPlate;

  constructor({ make, model, vin, plateInfo }: ICar) {
    this.make = make;
    this.model = model;
    this.vin = vin;
    this.plateInfo = plateInfo;
  }

  toCar() {
    return new Car(this);
  }

  toString() {
    return `${this.make} ${this.model} (${this.vin}) - ${this.plateInfo.toString()}`;
  }
}

export class CarDamage implements ICarDamage {
  @Prop({ type: String })
  location: CarDamageLocation;
  @Prop({ type: String })
  windowSide?: WindowSide;
  @Prop({ type: String })
  damageSize: DamageSize;

  constructor({ location, windowSide, damageSize }: ICarDamage) {
    this.location = location;
    this.windowSide = windowSide;
    this.damageSize = damageSize;
  }

  toCarDamage() {
    return new CarDamage(this);
  }

  toString() {
    return `${this.location} ${this.windowSide ? `(${this.windowSide})` : ""} - ${this.damageSize}`;
  }
}

export class CustomerQuote implements ICustomerQuote {
  @Prop({ type: String })
  customerQuoteId: string;
  @Prop({ type: String })
  salesmanId: string;
  @Prop({ type: String })
  technicianId: string;
  @Prop({ type: String })
  status: CustomerQuoteStatus;
  @Prop({ type: Person })
  customer: IPerson;
  @Prop({ type: Car })
  car: ICar;
  @Prop({ type: CarDamage })
  damage: ICarDamage;
  @Prop({ type: Address })
  address: IAddress;
  @Prop({ type: String })
  paymentType: PaymentType;
  @Prop({ type: String })
  packageType: PackageType;
  @Prop({ type: TimeBlock })
  callbackTime: ITimeBlock;
  @Prop({ type: Number })
  meetingTime: number;

  constructor({
    customerQuoteId,
    salesmanId,
    technicianId,
    status,
    customer,
    car,
    damage,
    address,
    paymentType,
    packageType,
    callbackTime,
    meetingTime,
  }: ICustomerQuote) {
    this.customerQuoteId = customerQuoteId;
    this.salesmanId = salesmanId;
    this.technicianId = technicianId;
    this.status = status;
    this.customer = customer;
    this.car = car;
    this.damage = damage;
    this.address = address;
    this.paymentType = paymentType;
    this.packageType = packageType;
    this.callbackTime = callbackTime;
    this.meetingTime = meetingTime;
  }

  toCustomerQuote() {
    return new CustomerQuote(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}
