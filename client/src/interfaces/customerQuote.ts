import type { IPerson } from "./person";
import type { ITimeBlock } from "./timeBlock";

export type IServiceType =
  | "Windshield Replacement"
  | "Auto Glass Replacement"
  | "ADAS Calibration"
  | "Crack & Chip Repair";

export const CustomerQuoteStatus = {
  NEW: "new",
  QUOTED: "quoted",
  VALIDATED: "insurance_validated",
  SCHEDULED: "scheduled",
  DONE: "done",
} as const;

export type CustomerQuoteStatus =
  (typeof CustomerQuoteStatus)[keyof typeof CustomerQuoteStatus];

export const CUSTOMER_QUOTE_STATUS = [
  CustomerQuoteStatus.NEW,
  CustomerQuoteStatus.QUOTED,
  CustomerQuoteStatus.VALIDATED,
  CustomerQuoteStatus.SCHEDULED,
  CustomerQuoteStatus.DONE,
];

export const PaymentType = {
  INSURANCE: "insurance",
  OUTOFPOCKET: "out_of_pocket",
} as const;

export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType];

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

export interface ICustomerQuote {
  customerQuoteId: string;
  teamMembers: string[];
  attatchments: ICustomerAttatchment[];
  status: CustomerQuoteStatus;
  fromCustomer: boolean;
  customer: IPerson;
  createdOn: number;
  notes: string;
  serviceType: IServiceType;
  car?: ICar;
  damage?: ICarDamage;
  address?: string;
  paymentInfo?: IPaymentInfo;
  callbackTime?: ICallbackInfo;
  meetingTime?: ITimeBlock;
}

export interface ICustomerAttatchment {
  attatchmentId: string;
  userId: string;
}

export interface ICallbackInfo {
  asap: boolean;
  dayPrefrence: string[];
  timePreference?: ITimeBlock;
}

export interface IPaymentInfo {
  type: PaymentType;
  serviceAmount: number;
  serviceAmountAfterTax: number;
  insurance?: IInsuranceInfo;
}

export interface ICar {
  make: string;
  model: string;
  year: number;
  vin?: string;
  plateInfo?: ICarPlate;
}

export interface ICarPlate {
  plate: string;
  zip: string;
}

export interface ICarDamage {
  location: CarDamageLocation;
  windowSide?: WindowSide;
  rows?: number[];
}

export interface IInsuranceInfo {
  insuranceName: string;
  policyNumber: string;
  fullCoverage: boolean;
  coverageAmount: number;
}
