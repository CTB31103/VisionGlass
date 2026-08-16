import {
  ActionButton,
  FullPage,
  MultiSelectInput,
  RadioInput,
  SelectInput,
  ServiceCard,
  TextInput,
  TitleWithSubtitle,
} from "@/components";
import {
  useDimensions,
  useRequestCallbackShortForm,
  useScreenSize,
  useTimeoutEffect,
} from "@/hooks";
import { SERVICES } from "@/interfaces";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { getBrands, getModelsByBrand } from "auto-parts-db";
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

export const Quote = () => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();

  const [serviceCardSquareRef, serviceCardSquareDims] = useDimensions();

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

  const [callbackAsap, setCallbackAsap] = useState(true);
  const [callbackDays, setCallbackDays] = useState(["Weekdays"]);

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

  return (
    <FullPage screen>
      <Stack
        spacing={4}
        sx={{
          paddingBlock: sizeUnder.xs
            ? 1.25
            : sizeUnder.sm
              ? 2.5
              : sizeUnder.md
                ? 5
                : 10,
          paddingInline: sizeUnder.xs
            ? 2.5
            : sizeUnder.sm
              ? 5
              : sizeUnder.md
                ? 10
                : 20,
        }}
      >
        <TitleWithSubtitle
          title="Request a callback"
          subtitle="Fill out this quick form and Vision Glass will call you back by the next day. All inputs marked with * are required."
        />

        <Stack spacing={2}>
          <Stack spacing={2} direction={sizeUnder.xs ? "column" : "row"}>
            <TextInput
              required
              label="First Name"
              value={firstName}
              setValue={setFirstName}
            />
            <TextInput
              required
              label="Last Name"
              value={lastName}
              setValue={setLastName}
            />
          </Stack>

          <Stack spacing={2} direction={sizeUnder.xs ? "column" : "row"}>
            <TextInput
              required
              label="Phone"
              value={phone}
              setValue={setPhone}
            />
            <TextInput
              optional
              label="Email"
              value={email}
              setValue={setEmail}
            />
          </Stack>

          <Stack
            spacing={2}
            direction={sizeUnder.xs ? "column-reverse" : "row"}
          >
            <RadioInput
              label="Tell us more about your vehicle"
              boxLabel="Tell us more"
              checked={tellUsMore}
              onClick={() => setTellUsMore((prev) => !prev)}
            />
            <SelectInput
              required
              label="Service"
              selectedItem={service}
              onSelect={setService}
              items={SERVICES.map((service) => ({ value: service }))}
            />
          </Stack>
        </Stack>

        {tellUsMore && (
          <Stack spacing={4}>
            <TitleWithSubtitle
              title="Vehicle Information"
              subtitle="Share some essential information about your ride to assist us in getting it fixed right."
            />

            <Stack spacing={2}>
              <Stack direction={sizeUnder.xs ? "column" : "row"} spacing={2}>
                <SelectInput
                  required
                  label="Car Make"
                  items={availableCarMakes.map((make) => ({ value: make }))}
                  selectedItem={carMake}
                  onSelect={setCarMake}
                />
                <SelectInput
                  required
                  disabled={availableCarModels.length === 0}
                  label="Car Model"
                  items={availableCarModels.map((model) => ({ value: model }))}
                  selectedItem={carModel}
                  onSelect={setCarModel}
                />
              </Stack>

              <Stack direction={sizeUnder.xs ? "column" : "row"} spacing={2}>
                <SelectInput
                  required
                  label="Car Year"
                  items={availableCarYears.map((year) => ({
                    value: year.toString(),
                  }))}
                  selectedItem={carYear.toString()}
                  onSelect={(v) => setCarYear(parseInt(v))}
                />
                <Stack sx={{ width: "100%" }} />
              </Stack>

              <Stack direction={sizeUnder.xs ? "column" : "row"} spacing={2}>
                <RadioInput
                  required
                  label="Identify Vehicle By"
                  boxLabel="Identify by VIN"
                  checked={identifyBy === "VIN"}
                  onClick={() => setIdentifyBy("VIN")}
                />
                <RadioInput
                  required
                  label="Identify Vehicle By"
                  boxLabel="Identify by Plate Number"
                  checked={identifyBy === "Plate"}
                  onClick={() => setIdentifyBy("Plate")}
                />
              </Stack>

              {identifyBy === "VIN" && (
                <Stack direction={sizeUnder.xs ? "column" : "row"} spacing={2}>
                  <TextInput
                    required
                    label="VIN"
                    value={vin}
                    setValue={setVin}
                  />
                  <RadioInput
                    label="Vehicle Damage"
                    boxLabel="Tell us where the damage is"
                    checked={shareDamage}
                    onClick={() => setShareDamage((prev) => !prev)}
                  />
                </Stack>
              )}

              {identifyBy === "Plate" && (
                <Stack spacing={2}>
                  <Stack
                    direction={sizeUnder.xs ? "column" : "row"}
                    spacing={2}
                  >
                    <TextInput
                      required
                      label="Plate Number"
                      value={plate}
                      setValue={setPlate}
                    />
                    <TextInput
                      required
                      label="Zipcode"
                      value={zip}
                      setValue={setZip}
                    />
                  </Stack>

                  <Stack
                    direction={sizeUnder.xs ? "column" : "row"}
                    spacing={2}
                  >
                    <RadioInput
                      label="Vehicle Damage"
                      boxLabel="Tell us where the damage is"
                      checked={shareDamage}
                      onClick={() => setShareDamage((prev) => !prev)}
                    />
                    <Stack sx={{ width: "100%" }}></Stack>
                  </Stack>
                </Stack>
              )}
            </Stack>

            {shareDamage && (
              <Stack spacing={4}>
                <TitleWithSubtitle
                  title="Vehicle Damage"
                  subtitle="Tell us where the damage is to ensure accurate assessment and quote."
                />

                <Stack
                  direction={sizeUnder.xs ? "column-reverse" : "row"}
                  spacing={sizeUnder.xs ? 4 : 2}
                >
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <SelectInput
                      required
                      label="Where is the vehicle damage?"
                      items={availableDamageOptions.map((option) => ({
                        value: option,
                      }))}
                      selectedItem={damageMainLocation}
                      onSelect={setDamageMainLocation}
                    />
                    {damageIsSideWindows && (
                      <Stack sx={{ width: "100%" }} spacing={2}>
                        <SelectInput
                          required
                          label="Which side is the damage on?"
                          items={availableSides.map((option) => ({
                            value: option,
                          }))}
                          selectedItem={damageSide}
                          onSelect={setDamageSide}
                        />
                        <MultiSelectInput
                          required
                          label="What row(s) is the damage on?"
                          items={availableRows.map((option) => ({
                            value: option,
                          }))}
                          selectedItems={damageRows}
                          onSelect={setDamageRows}
                        />
                      </Stack>
                    )}
                  </Stack>

                  <Stack
                    sx={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Stack
                      ref={serviceCardSquareRef}
                      sx={{
                        width: "80%",
                        height: serviceCardSquareDims.width,
                      }}
                    >
                      <ServiceCard
                        smallText={damageCardSmallTitle}
                        innerTitle={damageCardTitle}
                        url={damageImage}
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            )}

            <TitleWithSubtitle
              title="Payment Options"
              subtitle="Let us know how you want to pay, through insurance or out-of-pocket, we'll work with you or your insurance to get you the most affordable price."
            />

            <Stack spacing={2}>
              <Stack direction={sizeUnder.xs ? "column" : "row"} spacing={2}>
                <RadioInput
                  required
                  label="I'll pay with"
                  boxLabel="Out of pocket"
                  checked={!payWithInsurance}
                  onClick={() => setPayWithInsurance(false)}
                />
                <RadioInput
                  required
                  label="I'll pay with"
                  boxLabel="Insurance"
                  checked={payWithInsurance}
                  onClick={() => setPayWithInsurance(true)}
                />
              </Stack>

              {payWithInsurance && (
                <Stack direction={sizeUnder.xs ? "column" : "row"} spacing={2}>
                  <TextInput
                    label="Insurance Company Name:"
                    value={insuranceName}
                    setValue={setInsuranceName}
                    optional
                  />
                  <TextInput
                    label="Insurance Policy #:"
                    value={policyNumber}
                    setValue={setPolicyNumber}
                    optional
                  />
                </Stack>
              )}
            </Stack>
          </Stack>
        )}

        <TitleWithSubtitle
          title="Callback Time"
          subtitle="We'll give you a call back as soon as we can within 24 hours of receiving your request, or between a time that works for you!"
        />

        <Stack spacing={2}>
          <Stack spacing={2} direction={sizeUnder.xs ? "column" : "row"}>
            <RadioInput
              required
              checked={callbackAsap}
              label="Call me back"
              boxLabel="As soon as possible in the next 24 hours"
              onClick={() => setCallbackAsap(true)}
            />
            <RadioInput
              required
              checked={!callbackAsap}
              label="Call me back"
              boxLabel="Between these hours"
              onClick={() => setCallbackAsap(false)}
            />
          </Stack>

          {!callbackAsap && (
            <Stack spacing={2}>
              <MultiSelectInput
                required
                label="Choose day:"
                items={availableDays.map((d) => ({ value: d }))}
                selectedItems={callbackDays}
                onSelect={(values) =>
                  setCallbackDays((_prev) =>
                    values.length === 0
                      ? ["Weekdays"]
                      : values.length >= 2 && values.includes("Weekdays")
                        ? values.filter((v) =>
                            values[values.length - 1] === "Weekdays"
                              ? v === "Weekdays"
                              : v !== "Weekdays",
                          )
                        : values,
                  )
                }
              />
              <Stack
                direction={sizeUnder.xs ? "column" : "row"}
                sx={{ width: "100%" }}
                spacing={2}
              >
                <SelectInput
                  required
                  label="From:"
                  items={availableTimes.map((time) => ({ value: time }))}
                  selectedItem={phone}
                  onSelect={setPhone}
                />
                <SelectInput
                  required
                  label="To:"
                  items={availableTimes.map((time) => ({ value: time }))}
                  selectedItem={email}
                  onSelect={setEmail}
                />
              </Stack>
            </Stack>
          )}
        </Stack>

        <Stack
          sx={{
            pt: sizeUnder.xs ? 0 : 4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActionButton color="red">Request Quote</ActionButton>
        </Stack>
      </Stack>
    </FullPage>
  );
};
