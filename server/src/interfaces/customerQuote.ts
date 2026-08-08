import { IAddress } from "./address";
import { IPerson } from "./person";
import { ITimeBlock } from "./timeBlock";

export enum CustomerQuoteStatus {
  NEW = "new",
  VALIDATED = "insurance_validated",
  SCHEDULED = "scheduled",
  DONE = "done",
}

export enum PaymentType {
  INSURANCE = "insurance",
  ONSITE = "onsite",
}

export enum PackageType {
  PREMIUM = "premium",
  BASIC = "basic",
  ESSENTIALS = "essentials",
}

export enum CarDamageLocation {
  FRONT = "front",
  BACK = "back",
  SIDE = "side",
}

export enum WindowSide {
  LEFT = "left",
  RIGHT = "right",
}

export enum DamageSize {
  GREATER = "greater than 6 in.",
  LESSER = "less than 6 in.",
}

export interface ICustomerQuote {
  customerQuoteId: string;
  salesmanId: string;
  technicianId: string;
  status: CustomerQuoteStatus;
  customer: IPerson;
  car: ICar;
  damage: ICarDamage;
  address: IAddress;
  paymentType: PaymentType;
  packageType: PackageType;
  callbackTime: ITimeBlock;
  meetingTime: number;
}

export interface ICar {
  make: string;
  model: string;
  vin: string;
  plateInfo: ICarPlate;
}

export interface ICarPlate {
  plate: string;
  zip: string;
}

export interface ICarDamage {
  location: CarDamageLocation;
  windowSide?: WindowSide;
  damageSize: DamageSize;
}
