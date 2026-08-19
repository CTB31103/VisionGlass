import { useEffect, useState } from "react";
import { useTimeoutEffect } from "../utils";
import { getBrands, getModelsByBrand } from "auto-parts-db";
import { useRequestCallbackShortForm } from "../components";
import { IMAGES } from "@/assets";

const availableDays = [
  "Weekdays",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wedsnday",
  "Thursday",
  "Friday",
  "Saturday",
];
const availableDamageOptions = [
  "Front Windshield",
  "Back Windshield",
  "Side Window(s)",
];
const availableSides = ["Left", "Right", "Both"];
const availableSideImages = [
  IMAGES.VehicleDamageFront,
  IMAGES.VehicleDamageBack,
  IMAGES.VehicleDamageSide,
];
const availableRows = ["1st Row", "2nd Row", "3rd Row", "4th Row"];

export type UseCreateCustomerQuoteServiceResponse = ReturnType<
  typeof useCreateCustomerQuoteService
>;

export const useCreateCustomerQuoteService = () => {
  const {
    firstName,
    setFirstName,

    lastName,
    setLastName,

    phone,
    setPhone,

    service,
    setService,
  } = useRequestCallbackShortForm();
  const [email, setEmail] = useState("");
  const [tellUsMore, setTellUsMore] = useState(false);

  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState(new Date().getFullYear());
  const [identifyBy, setIdentifyBy] = useState<"VIN" | "Plate">("VIN");
  const [vin, setVin] = useState("");
  const [plate, setPlate] = useState("");
  const [zip, setZip] = useState("");
  const [shareDamage, setShareDamage] = useState(false);

  const [damageMainLocation, setDamageMainLocation] = useState(
    availableDamageOptions[0],
  );
  const [damageImage, setDamageImage] = useState(availableSideImages[0]);
  const [damageSide, setDamageSide] = useState("");
  const [damageRows, setDamageRows] = useState<string[]>([]);
  const damageIsSideWindows =
    damageMainLocation ===
    availableDamageOptions[availableDamageOptions.length - 1];
  const damageCardTitle = `${damageSide.length > 0 ? damageSide + " " : ""}${damageMainLocation}${damageRows.length === 1 ? "<br/> (" + damageRows[0] + ") " : damageRows.length > 1 ? `<br/> (Multiple Rows)` : ""}`;
  const damageCardSmallTitle = damageSide.length > 0 && damageRows.length > 0;

  const [payWithInsurance, setPayWithInsurance] = useState(false);
  const [insuranceName, setInsuranceName] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [servicePrice, setServicePrice] = useState(0);
  const [afterTaxPrice, setAfterTaxPrice] = useState(0);
  const [insuranceContacted, setInsuranceContacted] = useState(false);
  const [insuranceAccepted, setInsuranceAccepted] = useState(false);
  const [fullCoverage, setFullCoverage] = useState(false);
  const [insuranceAmount, setInsuranceAmount] = useState(0);

  const [callbackAsap, setCallbackAsap] = useState(true);
  const [callbackDays, setCallbackDays] = useState(["Weekdays"]);
  const [callbackFrom, setCallbackFrom] = useState("");
  const [callbackTo, setCallbackTo] = useState("");

  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [availableCarMakes, setAvailableCarMakes] = useState<string[]>([]);
  const [availableCarModels, setAvailableCarModels] = useState<string[]>([]);
  const [availableCarYears, setAvailableCarYears] = useState<number[]>([]);

  const setAvailableItems = () => {
    setAvailableTimes(
      Array(13)
        .fill(0)
        .map((_v, i) => {
          const num = (8 + i) % 12;
          const amPm = 8 + i >= 12 ? "PM" : "AM";

          if (num === 0) return `12 ${amPm}`;

          return `${num} ${amPm}`;
        }),
    );

    setAvailableCarMakes(getBrands().sort());
    setAvailableCarModels([]);
    setAvailableCarYears(
      Array(new Date().getFullYear() + 1 - 1980)
        .fill(0)
        .map((_v, i) => new Date().getFullYear() - i),
    );
  };

  useEffect(() => {
    setAvailableItems();
  }, []);

  useEffect(() => {
    if (carMake.length === 0) return;

    setCarModel("");
  }, [carMake]);

  useTimeoutEffect(
    () => {
      if (carMake.length === 0) return;
      if (carModel.length > 0) return;

      const models = getModelsByBrand(carMake);
      setAvailableCarModels(models.map((m) => m.name));
    },
    [carMake, carModel],
    50,
  );

  useEffect(() => {
    if (!damageIsSideWindows) {
      setDamageSide("");
      setDamageRows([]);
    }
  }, [damageMainLocation]);

  useEffect(() => {
    setDamageImage(
      availableSideImages[
        availableDamageOptions.findIndex((v) => v === damageMainLocation)
      ],
    );
  }, [damageMainLocation]);

  useEffect(() => {
    if (!tellUsMore) {
      setCarMake("");
      setCarModel("");
      setCarYear(new Date().getFullYear());
      setIdentifyBy("VIN");
      setVin("");
      setPlate("");
      setZip("");
      setShareDamage(false);
      setDamageMainLocation(availableDamageOptions[0]);
      setDamageImage(availableSideImages[0]);
      setDamageSide("");
      setDamageRows([]);
      setPayWithInsurance(false);
      setInsuranceName("");
      setPolicyNumber("");
    }
  }, [tellUsMore]);

  useEffect(() => {
    if (fullCoverage && insuranceAmount !== afterTaxPrice)
      setInsuranceAmount(afterTaxPrice);
  }, [fullCoverage]);

  useTimeoutEffect(
    () => {
      if (fullCoverage && insuranceAmount !== afterTaxPrice)
        setInsuranceAmount(afterTaxPrice);
    },
    [afterTaxPrice],
    250,
  );

  useEffect(() => {
    if (insuranceAmount !== afterTaxPrice && fullCoverage)
      setFullCoverage(false);
  }, [insuranceAmount]);

  useTimeoutEffect(
    () => {
      setAfterTaxPrice(servicePrice);
    },
    [servicePrice],
    250,
  );

  return {
    contactInfo: {
      firstName,
      setFirstName,
      lastName,
      setLastName,
      phone,
      setPhone,
      email,
      setEmail,
      tellUsMore,
      setTellUsMore,
      service,
      setService,
    },

    carInfo: {
      carMake,
      setCarMake,
      carModel,
      setCarModel,
      carYear,
      setCarYear,
      identifyBy,
      setIdentifyBy,
      vin,
      setVin,
      plate,
      setPlate,
      zip,
      setZip,
      shareDamage,
      setShareDamage,

      availableCarMakes,
      availableCarModels,
      availableCarYears,
    },

    carDamage: {
      damageMainLocation,
      setDamageMainLocation,
      damageSide,
      setDamageSide,
      damageRows,
      setDamageRows,
      damageCardSmallTitle,
      damageCardTitle,
      damageImage,
      availableDamageOptions,
      availableSides,
      availableRows,
      damageIsSideWindows,
    },

    paymentOptions: {
      payWithInsurance,
      setPayWithInsurance,
      insuranceName,
      setInsuranceName,
      policyNumber,
      setPolicyNumber,
      insuranceContacted,
      setInsuranceContacted,
      servicePrice,
      setServicePrice,
      afterTaxPrice,
      setAfterTaxPrice,
      insuranceAccepted,
      setInsuranceAccepted,
      insuranceAmount,
      setInsuranceAmount,
      fullCoverage,
      setFullCoverage,
    },

    callbackInfo: {
      callbackAsap,
      setCallbackAsap,
      callbackDays,
      setCallbackDays,
      callbackFrom,
      setCallbackFrom,
      callbackTo,
      setCallbackTo,
      availableDays,
      availableTimes,
    },
  };
};
