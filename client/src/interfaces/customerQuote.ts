import type { IAddress } from "./address";
import type { IPerson } from "./person";
import type { ITimeBlock } from "./timeBlock";

export const CustomerQuoteStatus = {
  NEW: "new",
  VALIDATED: "insurance_validated",
  SCHEDULED: "scheduled",
  DONE: "done",
} as const;

export type CustomerQuoteStatus =
  (typeof CustomerQuoteStatus)[keyof typeof CustomerQuoteStatus];

export const CUSTOMER_QUOTE_STATUS = [
  CustomerQuoteStatus.NEW,
  CustomerQuoteStatus.VALIDATED,
  CustomerQuoteStatus.SCHEDULED,
  CustomerQuoteStatus.DONE,
];

export const PaymentType = {
  INSURANCE: "insurance",
  ONSITE: "onsite",
} as const;

export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType];

export const PackageType = {
  PREMIUM: "premium",
  BASIC: "basic",
  ESSENTIALS: "essentials",
} as const;

export type PackageType = (typeof PackageType)[keyof typeof PackageType];

export const CarDamageLocation = {
  FRONT: "front",
  BACK: "back",
  SIDE: "side",
} as const;

export type CarDamageLocation =
  (typeof CarDamageLocation)[keyof typeof CarDamageLocation];

export const WindowSide = {
  LEFT: "left",
  RIGHT: "right",
} as const;

export type WindowSide = (typeof WindowSide)[keyof typeof WindowSide];

export const DamageSize = {
  GREATER: "greater than 6 in.",
  LESSER: "less than 6 in.",
} as const;

export type DamageSize = (typeof DamageSize)[keyof typeof DamageSize];

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
