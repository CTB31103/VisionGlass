import {
  getModelForClass,
  index,
  modelOptions,
  Prop,
  PropType,
} from "@typegoose/typegoose";
import {
  CarDamageLocation,
  CustomerQuoteStatus,
  IAddress,
  ICallbackInfo,
  ICar,
  ICarDamage,
  ICarPlate,
  ICustomerQuote,
  IInsuranceInfo,
  IPaymentInfo,
  IPerson,
  ITimeBlock,
  PaymentType,
  WindowSide,
} from "../interfaces";
import { Person } from "./person";
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
}

export class Car implements ICar {
  @Prop({ type: String })
  make: string;
  @Prop({ type: String })
  model: string;
  @Prop({ type: Number })
  year: number;
  @Prop({ type: String })
  vin?: string;
  @Prop({ type: CarPlate, _id: false })
  plateInfo?: ICarPlate;

  constructor({ make, model, year, vin, plateInfo }: ICar) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.vin = vin;
    this.plateInfo = plateInfo ? new CarPlate(plateInfo) : undefined;
  }

  toCar() {
    return new Car(this);
  }
}

export class CarDamage implements ICarDamage {
  @Prop({ type: String })
  location: CarDamageLocation;
  @Prop({ type: String })
  windowSide?: WindowSide;
  @Prop({ type: () => [Number], _id: false }, PropType.ARRAY)
  rows?: number[];

  constructor({ location, windowSide, rows }: ICarDamage) {
    this.location = location;
    this.windowSide = windowSide;
    this.rows = rows;
  }

  toCarDamage() {
    return new CarDamage(this);
  }
}

export class CallbackInfo implements ICallbackInfo {
  @Prop({ type: Boolean })
  asap: boolean;
  @Prop({ type: () => [String], _id: false }, PropType.ARRAY)
  dayPrefrence: string[];
  @Prop({ type: TimeBlock, _id: false })
  timePreference?: ITimeBlock | undefined;

  constructor({ asap, dayPrefrence, timePreference }: ICallbackInfo) {
    this.asap = asap;
    this.dayPrefrence = dayPrefrence;
    this.timePreference = timePreference
      ? new TimeBlock(timePreference)
      : undefined;
  }

  toCallbackInfo() {
    return new CallbackInfo(this);
  }
}

export class InsuranceInfo implements IInsuranceInfo {
  @Prop({ type: String })
  insuranceName: string;
  @Prop({ type: String })
  policyNumber: string;
  @Prop({ type: Boolean })
  fullCoverage: boolean;
  @Prop({ type: Number })
  coverageAmount: number;

  constructor(props: IInsuranceInfo) {
    this.insuranceName = props.insuranceName;
    this.policyNumber = props.policyNumber;
    this.fullCoverage = props.fullCoverage;
    this.coverageAmount = props.coverageAmount;
  }

  toInsuranceInfo() {
    return new InsuranceInfo(this);
  }
}

export class PaymentInfo implements IPaymentInfo {
  @Prop({ type: String })
  type: PaymentType;
  @Prop({ type: Number })
  serviceAmount: number;
  @Prop({ type: Number })
  serviceAmountAfterTax: number;
  @Prop({ type: InsuranceInfo, _id: false })
  insurance?: IInsuranceInfo | undefined;

  constructor(props: IPaymentInfo) {
    this.type = props.type;
    this.serviceAmount = props.serviceAmount;
    this.serviceAmountAfterTax = props.serviceAmountAfterTax;
    this.insurance = props.insurance
      ? new InsuranceInfo(props.insurance)
      : undefined;
  }

  toPaymentInfo() {
    return new PaymentInfo(this);
  }
}

@modelOptions({
  schemaOptions: {
    collection: "CustomerQuotes",
  },
})
@index({ customerQuoteId: 1 }, { unique: true })
export class CustomerQuote implements ICustomerQuote {
  @Prop({ type: String })
  customerQuoteId: string;
  @Prop({ type: String })
  status: CustomerQuoteStatus;
  @Prop({ type: Person, _id: false })
  customer: IPerson;
  @Prop({ type: Car, _id: false })
  car?: ICar;
  @Prop({ type: CarDamage, _id: false })
  damage?: ICarDamage;
  @Prop({ type: String })
  address?: string;
  @Prop({ type: TimeBlock, _id: false })
  meetingTime?: ITimeBlock;
  @Prop({ type: () => [String] }, PropType.ARRAY)
  teamMembers: string[];
  @Prop({ type: PaymentInfo, _id: false })
  paymentInfo?: IPaymentInfo;
  @Prop({ type: CallbackInfo, _id: false })
  callbackTime?: ICallbackInfo;

  constructor({
    customerQuoteId,
    status,
    customer,
    car,
    damage,
    address,
    callbackTime,
    meetingTime,
    teamMembers,
    paymentInfo,
  }: ICustomerQuote) {
    this.customerQuoteId = customerQuoteId;
    this.status = status;
    this.customer = new Person(customer);
    this.car = car ? new Car(car) : undefined;
    this.damage = damage ? new CarDamage(damage) : undefined;
    this.address = address;
    this.teamMembers = teamMembers;
    this.paymentInfo = paymentInfo ? new PaymentInfo(paymentInfo) : undefined;
    this.callbackTime = callbackTime
      ? new CallbackInfo(callbackTime)
      : undefined;
    this.meetingTime = meetingTime ? new TimeBlock(meetingTime) : undefined;
  }

  toCustomerQuote() {
    return new CustomerQuote(this);
  }
}

export const CustomerQuoteModel = getModelForClass(CustomerQuote);
