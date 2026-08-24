import type { ICarDamage, IInsuranceInfo, IPaymentInfo } from "@/interfaces";
import { requiredWith, RULES, validation } from "../validation";

export const validateCarDamageFull = (data: unknown) => {
  const validCarDamage = validation<ICarDamage>(
    {
      location: [RULES.common.requiredString, "car damage main location"],
      rows: [
        RULES.multiple(
          RULES.common.optionalString,
          requiredWith(["windowSide"]),
        ),
        "car damage rows",
      ],
      windowSide: [
        RULES.multiple(RULES.common.optionalString, requiredWith(["rows"])),
        "car damage side",
      ],
    },
    data,
  );

  return validCarDamage;
};

export const validateCarDamageShort = (data: unknown) => {
  const validCarDamage = validation<ICarDamage>(
    {
      location: [RULES.common.requiredString, "car damage main location"],
    },
    data,
  );

  return validCarDamage;
};

export const validateInsurance = (data: unknown) => {
  const validInsurance = validation<IInsuranceInfo>(
    {
      coverageAmount: [
        RULES.common.requiredNumber,
        "insurance coverage amount",
      ],
      fullCoverage: [RULES.common.requiredBool, "insurance full coverage"],
      insuranceName: [RULES.common.requiredString, "insurance company name"],
      policyNumber: [RULES.common.requiredString, "insurance policy number"],
    },
    data,
  );

  return validInsurance;
};

export const validatePayment = (data: unknown) => {
  const validPayment = validation<Omit<IPaymentInfo, "insurance">>(
    {
      serviceAmount: [
        RULES.multiple(RULES.common.requiredNumber, RULES.min(1)),
        "service amount",
      ],
      serviceAmountAfterTax: [
        RULES.multiple(RULES.common.requiredNumber, RULES.min(1)),
        "service amount after tax",
      ],
      type: [RULES.common.requiredString, "service type"],
    },
    data,
  );

  if ((data as IPaymentInfo)?.insurance) {
    const validInsurance = validateInsurance((data as IPaymentInfo).insurance);

    return { validPayment, validInsurance };
  }

  return { validPayment, validInsurance: undefined };
};

export const validateAddress = (data: unknown) => {
  const validAddress = validation<{ address: string }>(
    { address: [RULES.common.requiredString, ""] },
    data,
  );

  return validAddress;
};
