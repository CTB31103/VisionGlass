import {
  ICallbackInfo,
  ICar,
  ICarDamage,
  ICarPlate,
  IInsuranceInfo,
  IPaymentInfo,
  IPerson,
  ITimeBlock,
} from "../interfaces";
import { CalendarEventValidators } from "./calendarEventValidators";
import { USER_RULES } from "./userControllerValidators";
import {
  IRules,
  IRulesV2,
  requiredWith,
  RULES,
  validationV2,
} from "./validate";

const validateCarInfo = (data: any): ICar => {
  type IRequiredData = Omit<Omit<ICar, "plateInfo">, "vin">;
  const rules: IRulesV2<IRequiredData> = {
    make: [RULES.common.requiredString, ""],
    model: [RULES.common.requiredString, ""],
    year: [RULES.common.requiredNumber, ""],
  };
  let validCarInfo = validationV2<IRequiredData>(rules, data);
  if (validCarInfo.errorMsg || !validCarInfo.validData)
    throw new Error(validCarInfo.errorMsg ?? "Internal validation error.");

  let vin: string | undefined = undefined;
  let plateInfo: ICarPlate | undefined = undefined;

  if (data?.vin) {
    let validVinInfo = validationV2<{ vin: string }>(
      { vin: [RULES.common.requiredString, ""] },
      data,
    );
    if (validVinInfo.errorMsg || !validVinInfo.validData)
      throw new Error(validVinInfo.errorMsg ?? "Internal validation error.");
    vin = validVinInfo.validData.vin;
  }

  if (data?.plateInfo) {
    let validPlateInfo = validationV2<ICarPlate>(
      {
        plate: [RULES.common.requiredString, "car plate number"],
        zip: [RULES.common.requiredString, "regerstered zip code"],
      },
      data,
    );
    if (validPlateInfo.errorMsg || !validPlateInfo.validData)
      throw new Error(validPlateInfo.errorMsg ?? "Internal validation error.");
    plateInfo = validPlateInfo.validData;
  }

  return {
    ...validCarInfo.validData,
    vin,
    plateInfo,
  };
};

const validateDamageInfo = (data: any): ICarDamage => {
  const validDamageInfo = validationV2<ICarDamage>(
    {
      location: [RULES.common.requiredString, ""],
      rows: [
        RULES.multiple(
          RULES.common.optionalArray,
          requiredWith(["windowSide"]),
        ),
        "row",
      ],
      windowSide: [
        RULES.multiple(RULES.common.optionalString, requiredWith(["row"])),
        "window side",
      ],
    },
    data,
  );
  if (validDamageInfo.errorMsg || !validDamageInfo.validData)
    throw new Error(validDamageInfo.errorMsg ?? "Internal validation error.");
  return validDamageInfo.validData;
};

const validatePerson = (data: any): IPerson => {
  const validPerson = validationV2<IPerson>(
    {
      firstName: [USER_RULES.info.firstName, "first name"],
      lastName: [USER_RULES.info.lastName, "last name"],
      email: [RULES.common.optionalEmail, ""],
      phone: [USER_RULES.info.phone, ""],
    },
    data,
  );
  if (validPerson.errorMsg || !validPerson.validData)
    throw new Error(validPerson.errorMsg ?? "Internal validation error.");
  return validPerson.validData;
};

const validateInsuracneInfo = (data: any): IInsuranceInfo => {
  const validInsuranceInfo = validationV2<IInsuranceInfo>(
    {
      coverageAmount: [
        RULES.common.requiredNumber,
        "insurance coverage amount",
      ],
      fullCoverage: [
        RULES.common.requiredBool,
        "insurance full coverage field",
      ],
      insuranceName: [RULES.common.requiredString, "insurance name"],
      policyNumber: [RULES.common.requiredString, "insurance policy number"],
    },
    data,
  );

  if (validInsuranceInfo.errorMsg || !validInsuranceInfo.validData)
    throw new Error(
      validInsuranceInfo.errorMsg ?? "Internal validation error.",
    );

  return validInsuranceInfo.validData;
};

const validatePaymentInfo = (data: any): IPaymentInfo => {
  const validPaymentInfo = validationV2<Omit<IPaymentInfo, "insurance">>(
    {
      serviceAmount: [RULES.common.requiredNumber, ""],
      serviceAmountAfterTax: [RULES.common.requiredNumber, ""],
      type: [RULES.common.requiredString, ""],
    },
    data,
  );

  if (validPaymentInfo.errorMsg || !validPaymentInfo.validData)
    throw new Error(validPaymentInfo.errorMsg ?? "Internal validation error.");

  let insurance: IInsuranceInfo | undefined = undefined;
  if (data.insurance) {
    insurance = validateInsuracneInfo(data.insurance);
  }
  return {
    ...validPaymentInfo.validData,
    insurance,
  };
};

const validateCallbackTime = (data: any): ICallbackInfo => {
  const validCallbackTime = validationV2<Omit<ICallbackInfo, "timePreference">>(
    {
      asap: [RULES.common.requiredBool, "callback asap"],
      dayPrefrence: [RULES.common.requiredArray, "callback day preference"],
    },
    data,
  );

  if (validCallbackTime.errorMsg || !validCallbackTime.validData)
    throw new Error(validCallbackTime.errorMsg ?? "Internal validation error.");

  let timePreference: ITimeBlock | undefined = undefined;
  if (data.timePreference) {
    timePreference = CalendarEventValidators.timeBlockValidation(
      data.timePreference,
    );
  }

  return { ...validCallbackTime.validData, timePreference };
};

const create = (body: any) => {
  let customer = validatePerson(body.customer);

  let carInfo: ICar | undefined = undefined;
  if (body.carInfo) {
    carInfo = validateCarInfo(body.carInfo);
  }

  let damageInfo: ICarDamage | undefined;
  if (body.damageInfo) {
    damageInfo = validateDamageInfo(body.damageInfo);
  }

  let address: string | undefined = undefined;
  if (body.address) {
    const validAddress = validationV2<{ address: string }>(
      { address: [RULES.common.optionalString, "car location"] },
      body,
    );
    if (validAddress.errorMsg || !validAddress.validData)
      throw new Error(validAddress.errorMsg ?? "Internal validation error.");
    address = validAddress.validData.address;
  }

  let paymentInfo: IPaymentInfo | undefined = undefined;
  if (body.paymentInfo) {
    paymentInfo = validatePaymentInfo(body.paymentInfo);
  }

  let callbackTime: ICallbackInfo | undefined = undefined;
  if (body.callbackTime) {
    callbackTime = validateCallbackTime(body.callbackTime);
  }

  let meetingTime: ITimeBlock | undefined = undefined;
  if (body.meetingTime !== undefined) {
    const validMeetingTime = CalendarEventValidators.timeBlockValidation(
      body.meetingTime,
    );
    meetingTime = validMeetingTime;
  }

  const { validData: validNotes, errorMsg: notesErr } = validationV2<{
    notes: string;
  }>({ notes: [RULES.common.presentString, ""] }, body);
  if (notesErr || !validNotes) throw new Error(notesErr);

  return {
    customer,
    carInfo,
    damageInfo,
    address,
    paymentInfo,
    callbackTime,
    meetingTime,
    ...validNotes,
  };
};

const edit = (body: any) => {
  const validCreate = create(body);

  const { validData, errorMsg } = validationV2<{ customerQuoteId: string }>(
    { customerQuoteId: [RULES.common.requiredString, ""] },
    body,
  );
  if (errorMsg || !validData) throw new Error(errorMsg);

  return { ...validCreate, ...validData };
};

const customerQuoteId = (params: any) => {
  const { validData, errorMsg } = validationV2<{ customerQuoteId: string }>(
    { customerQuoteId: [RULES.common.requiredString, ""] },
    params,
  );
  if (errorMsg || !validData) throw new Error(errorMsg);

  return validData;
};

const editStatus = (body: any) => {
  const { validData, errorMsg } = validationV2<{
    customerQuoteId: string;
    status: string;
  }>(
    {
      customerQuoteId: [RULES.common.requiredString, ""],
      status: [RULES.common.requiredString, ""],
    },
    body,
  );
  if (errorMsg || !validData) throw new Error(errorMsg);
  return validData;
};

const toggleTeamMember = (body: any) => {
  const { validData, errorMsg } = validationV2<{
    userId: string;
    customerQuoteId: string;
  }>(
    {
      userId: [RULES.common.requiredString, ""],
      customerQuoteId: [RULES.common.requiredString, ""],
    },
    body,
  );
  if (errorMsg || !validData) throw new Error(errorMsg);
  return validData;
};

export const CustomerQuoteValidators = {
  create,
  edit,
  customerQuoteId,
  editStatus,
  toggleTeamMember,
};
