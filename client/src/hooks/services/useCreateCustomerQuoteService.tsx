import { useEffect, useState } from "react";
import { useRefreshEffect, useTimeoutEffect } from "../utils";
import { getBrands, getModelsByBrand } from "auto-parts-db";
import { useRequestCallbackShortForm } from "../components";
import { IMAGES } from "@/assets";
import {
  CarDamageLocation,
  Service,
  type ICustomerQuote,
  type IServiceType,
  type WindowSide,
} from "@/interfaces";
import { useApi } from "../api";
import moment from "moment";
import {
  capitalize,
  capitalizeAllWords,
  damageInfoString,
  fromTimeString,
  toNearestHalfHour,
  toString,
} from "@/utils";
import {
  validateAddress,
  validatePayment,
  validatePerson,
  validateTimeBlock,
  type ICombinedValidationResponse,
} from "@/validation";
import { useLocation, useParams } from "react-router";
import { ROUTES } from "@/Constants";

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
const availableDamageOptions: { value: string; text: string }[] = [
  { value: CarDamageLocation.FRONT, text: "Front Windshield" },
  { value: CarDamageLocation.BACK, text: "Back Windshield" },
  { value: CarDamageLocation.SIDE, text: "Side Window(s)" },
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

export const useCreateCustomerQuoteService = (
  isCustomerForm: boolean = false,
) => {
  const params = useParams();
  const location = useLocation();

  const {
    snackbar: [_, errorSnack],
    customerQuoteRoutes: {
      createCustomerQuoteServiceAuth,
      createCustomerQuoteService,
      getCustomer,
      edit,
    },
  } = useApi();

  const [loading, setLoading] = useState(false);
  const [successModelOpen, setSuccessModalOpen] = useState(false);

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
  const [notes, setNotes] = useState("");

  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState(new Date().getFullYear());
  const [identifyBy, setIdentifyBy] = useState<"VIN" | "Plate">("VIN");
  const [vin, setVin] = useState("");
  const [plate, setPlate] = useState("");
  const [zip, setZip] = useState("");
  const [shareDamage, setShareDamage] = useState(false);

  const [damageMainLocation, setDamageMainLocation] = useState(
    availableDamageOptions[0].value,
  );
  const [damageImage, setDamageImage] = useState(availableSideImages[0]);
  const [damageSide, setDamageSide] = useState("");
  const [damageRows, setDamageRows] = useState<number[]>([]);
  const [damageCardTitle, setDamageCardTitle] = useState(
    capitalizeAllWords(
      damageInfoString(damageSide, damageMainLocation, damageRows),
    ),
  );
  const damageIsSideWindows =
    damageMainLocation ===
    availableDamageOptions[availableDamageOptions.length - 1].value;
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
  const [callbackFrom, setCallbackFrom] = useState<Date | undefined>(undefined);
  const [callbackTo, setCallbackTo] = useState(new Date());

  const [readyToSchedule, setReadyToSchedule] = useState(false);
  const [carAddress, setCarAddress] = useState("");
  const [meetingTime, setMeetingTime] = useState<Date>(
    toNearestHalfHour(new Date()),
  );
  const [endMeetingTime, setEndMeetingTime] = useState(
    moment(meetingTime).add(30, "minutes").toDate(),
  );

  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [availableCarMakes, setAvailableCarMakes] = useState<string[]>([]);
  const [availableCarModels, setAvailableCarModels] = useState<string[]>([]);
  const [availableCarYears, setAvailableCarYears] = useState<number[]>([
    new Date().getFullYear(),
  ]);

  const [createdQuote, setCreatedQuote] = useState<ICustomerQuote | undefined>(
    undefined,
  );

  const [editingCustomer, setEditingCustomer] = useState<
    ICustomerQuote | undefined
  >(undefined);

  const paymentOptional = readyToSchedule
    ? !readyToSchedule
    : payWithInsurance
      ? !insuranceContacted
      : !readyToSchedule;
  const paymentRequired = readyToSchedule
    ? readyToSchedule
    : payWithInsurance
      ? insuranceContacted
      : readyToSchedule;

  const isEditingPage = location.pathname.includes(ROUTES.CUSTOMERS_EDIT);

  const setAvailableItems = () => {
    setAvailableTimes(
      Array(13)
        .fill(0)
        .map((_v, i) => {
          const num = (8 + i) % 12;
          const amPm = 8 + i >= 12 ? "pm" : "am";

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

  const getEditingCustomer = async (customerQuoteId: string) => {
    setLoading(true);

    const res = await getCustomer(customerQuoteId);
    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    setEditingCustomer(res.data.customer);
  };

  useEffect(() => {
    setDamageCardTitle(
      capitalizeAllWords(
        damageInfoString(damageSide, damageMainLocation, damageRows),
      ),
    );
  }, [damageSide, damageMainLocation, damageRows]);

  useEffect(() => {
    setAvailableItems();
  }, []);

  useEffect(() => {
    if (editingCustomer?.customerQuoteId && isEditingPage) {
      setFirstName(editingCustomer.customer.firstName);
      setLastName(editingCustomer.customer.lastName);
      setPhone(editingCustomer.customer.phone);
      setService(editingCustomer.serviceType);
      setEmail(editingCustomer.customer.email);
      setTellUsMore(editingCustomer.car ? true : false);
      setNotes(editingCustomer.notes);

      setCarMake(editingCustomer.car?.make ?? "");
      // setCarModel(editingCustomer.car?.model ?? "");
      setCarYear(editingCustomer.car?.year ?? new Date().getFullYear());
      setIdentifyBy(editingCustomer.car?.plateInfo ? "Plate" : "VIN");
      setVin(editingCustomer.car?.vin ?? "");
      setPlate(editingCustomer.car?.plateInfo?.plate ?? "");
      setZip(editingCustomer.car?.plateInfo?.zip ?? "");
      setShareDamage(editingCustomer.damage ? true : false);

      setDamageMainLocation(editingCustomer.damage?.location ?? "");
      setDamageSide(
        editingCustomer.damage?.windowSide
          ? capitalize(editingCustomer.damage.windowSide)
          : "",
      );
      setDamageRows(editingCustomer.damage?.rows ?? []);

      setPayWithInsurance(
        editingCustomer.paymentInfo?.insurance ? true : false,
      );
      setInsuranceName(
        editingCustomer.paymentInfo?.insurance?.insuranceName ?? "",
      );
      setPolicyNumber(
        editingCustomer.paymentInfo?.insurance?.policyNumber ?? "",
      );
      setServicePrice(editingCustomer.paymentInfo?.serviceAmount ?? 0);
      setAfterTaxPrice(editingCustomer.paymentInfo?.serviceAmountAfterTax ?? 0);
      setInsuranceContacted(
        (editingCustomer.paymentInfo?.insurance?.coverageAmount ?? 0) > 0,
      );
      setInsuranceAccepted(
        (editingCustomer.paymentInfo?.insurance?.coverageAmount ?? 0) > 0,
      );
      setFullCoverage(
        editingCustomer.paymentInfo?.insurance?.fullCoverage ?? false,
      );
      setInsuranceAmount(
        editingCustomer.paymentInfo?.insurance?.coverageAmount ?? 0,
      );

      setCallbackAsap(editingCustomer.callbackTime?.asap ?? false);
      setCallbackDays(
        editingCustomer.callbackTime?.dayPrefrence ?? ["Weekdays"],
      );
      const editingCallback = editingCustomer.callbackTime?.timePreference;
      setCallbackFrom(
        editingCallback ? new Date(editingCallback.from) : undefined,
      );
      setCallbackTo(
        editingCallback ? new Date(editingCallback.to) : new Date(),
      );

      setReadyToSchedule(editingCustomer.meetingTime ? true : false);
      setCarAddress(editingCustomer.address ?? "");
      setMeetingTime(
        new Date(editingCustomer.meetingTime?.from ?? new Date().getTime()),
      );
      setEndMeetingTime(
        new Date(editingCustomer.meetingTime?.to ?? new Date().getTime()),
      );
    }
  }, [editingCustomer?.customerQuoteId, isEditingPage]);

  useEffect(() => {
    if (isCustomerForm) {
      setCallbackFrom(
        callbackAsap ? undefined : fromTimeString("8:00 am", new Date()),
      );
      setCallbackTo(fromTimeString("8:00 pm", new Date()));
    }
  }, [isCustomerForm, callbackAsap]);

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
      if (editingCustomer?.car && carModel !== editingCustomer.car.model)
        setCarModel(editingCustomer.car.model);
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
        availableDamageOptions.findIndex((v) => v.value === damageMainLocation)
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
      setDamageMainLocation(availableDamageOptions[0].value);
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

  useEffect(() => {
    setEndMeetingTime(moment(meetingTime).add(30, "minutes").toDate());
  }, [meetingTime.getTime()]);

  useRefreshEffect(
    () => {
      if (params.customerQuoteId && isEditingPage) {
        getEditingCustomer(params.customerQuoteId);
      }
    },
    [toString(params), isEditingPage],
    50,
  );

  const isValid = (data: ReturnType<typeof createData>) => {
    const validObjects: ICombinedValidationResponse<unknown>[] = [];

    const validCustomer = validatePerson(data.customer);
    validObjects.push(validCustomer);

    if (paymentRequired && data.paymentInfo) {
      const { validPayment, validInsurance } = validatePayment(
        data.paymentInfo,
      );
      validObjects.push(validPayment);

      if (validInsurance) validObjects.push(validInsurance);
    }

    if (readyToSchedule) {
      const validScheduling = validateTimeBlock(data.meetingTime, [
        "service appointment start time",
        "service appointment end time",
      ]);
      validObjects.push(validScheduling);

      const validAddress = validateAddress(data);
      validObjects.push(validAddress);
    }

    for (const validObj of validObjects) {
      if (validObj.errorMsg) {
        errorSnack(validObj.errorMsg);
        return false;
      }
    }

    return true;
  };

  const createData = () => {
    const data: Parameters<typeof createCustomerQuoteServiceAuth>[0] = {
      serviceType: service as IServiceType,
      fromCustomer: isCustomerForm,
      customer: {
        firstName,
        lastName,
        email,
        phone,
      },
      car:
        isCustomerForm && !tellUsMore
          ? undefined
          : carMake.length > 0 || carModel.length > 0
            ? {
                make: carMake,
                model: carModel,
                year: carYear,

                vin: vin.length > 0 ? vin : undefined,
                plateInfo:
                  plate.length > 0 || zip.length > 0
                    ? {
                        plate,
                        zip,
                      }
                    : undefined,
              }
            : undefined,
      paymentInfo:
        isCustomerForm && !tellUsMore
          ? undefined
          : {
              type: payWithInsurance ? "insurance" : "out_of_pocket",
              serviceAmount: servicePrice,
              serviceAmountAfterTax: afterTaxPrice,
              insurance: payWithInsurance
                ? {
                    insuranceName,
                    coverageAmount: insuranceAmount,
                    fullCoverage,
                    policyNumber,
                  }
                : undefined,
            },
      damage:
        isCustomerForm && !shareDamage
          ? undefined
          : damageMainLocation.length > 0
            ? {
                location: damageMainLocation as CarDamageLocation,
                rows: damageRows,
                windowSide: damageSide as WindowSide,
              }
            : undefined,
      address: readyToSchedule ? carAddress : undefined,
      meetingTime: readyToSchedule
        ? {
            from: meetingTime.getTime(),
            to: endMeetingTime.getTime(),
          }
        : undefined,
      notes,
      callbackTime: isCustomerForm
        ? {
            asap: callbackAsap,
            dayPrefrence: callbackDays,
            timePreference: callbackFrom
              ? {
                  from: callbackFrom.getTime(),
                  to: callbackTo.getTime(),
                }
              : undefined,
          }
        : undefined,
    };

    return data;
  };

  const submitToAPI = async () => {
    setLoading(true);
    const data = createData();

    if (!isValid(data)) {
      setLoading(false);
      return;
    }

    const res = await (isEditingPage && editingCustomer
      ? edit({ ...editingCustomer, ...data })
      : isCustomerForm
        ? createCustomerQuoteService(data)
        : createCustomerQuoteServiceAuth(data));
    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    setSuccessModalOpen(true);
    if (res.data.customer) setCreatedQuote(res.data.customer);
  };

  const clearState = () => {
    setLoading(false);
    setSuccessModalOpen(false);

    setFirstName("");
    setLastName("");
    setPhone("");
    setService(Service.Windshield);
    setEmail("");
    setTellUsMore(false); // UseEffect above clears more state values when this is false
    setNotes("");

    setServicePrice(0);
    setAfterTaxPrice(0);
    setInsuranceContacted(false);
    setInsuranceAccepted(false);
    setFullCoverage(false);
    setInsuranceAmount(0);

    setCallbackAsap(true);
    setCallbackDays([]);
    setCallbackFrom(undefined);
    setCallbackTo(new Date());

    setReadyToSchedule(false);
    setCarAddress("");
    setMeetingTime(toNearestHalfHour(new Date()));
    setEndMeetingTime(moment(meetingTime).add(30, "minutes").toDate());
  };

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

      paymentOptional,
      paymentRequired,
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

    meetingInfo: {
      carAddress,
      setCarAddress,
      meetingTime,
      setMeetingTime,
      readyToSchedule,
      setReadyToSchedule,
      endMeetingTime,
      setEndMeetingTime,
    },

    isEditingPage,
    loading,
    createdQuote,
    successModelOpen,
    setSuccessModalOpen,
    clearState,

    submitToAPI,
  };
};
