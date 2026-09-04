import { RadioInput, SelectInput, TextInput } from "@/components/inputs";
import {
  useScreenSize,
  type UseCreateCustomerQuoteServiceResponse,
} from "@/hooks";
import { Stack } from "@mui/material";

type CarInfoProps = {
  state: UseCreateCustomerQuoteServiceResponse["carInfo"];

  tellUsMoreRadio?: boolean;
  optional?: boolean;
};

export const CarInfo = ({
  state: {
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
    shareDamage,
    setShareDamage,
    plate,
    setPlate,
    zip,
    setZip,

    availableCarMakes,
    availableCarModels,
    availableCarYears,
  },
  tellUsMoreRadio,
  optional,
}: CarInfoProps) => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  return (
    <Stack spacing={2}>
      <Stack direction={sizeUnder.xs ? "column" : "row"} spacing={2}>
        <SelectInput
          required={!optional}
          label="Car Make"
          items={availableCarMakes.map((make) => ({ value: make }))}
          selectedItem={carMake}
          onSelect={setCarMake}
          optional={optional}
        />
        <SelectInput
          required={!optional}
          disabled={availableCarModels.length === 0}
          label="Car Model"
          items={availableCarModels.map((model) => ({ value: model }))}
          selectedItem={carModel}
          onSelect={setCarModel}
          optional={optional}
        />
      </Stack>

      <Stack direction={sizeUnder.xs ? "column" : "row"} spacing={2}>
        <SelectInput
          required={!optional}
          label="Car Year"
          items={availableCarYears.map((year) => ({
            value: year.toString(),
          }))}
          selectedItem={carYear.toString()}
          onSelect={(v) => setCarYear(parseInt(v))}
          optional={optional}
        />
        <Stack sx={{ width: "100%" }} />
      </Stack>

      <Stack direction={sizeUnder.xs ? "column" : "row"} spacing={2}>
        <RadioInput
          required={!optional}
          label="Identify Vehicle By"
          boxLabel="Identify by VIN"
          checked={identifyBy === "VIN"}
          onClick={() => setIdentifyBy("VIN")}
          optional={optional}
        />
        <RadioInput
          required={!optional}
          label="Identify Vehicle By"
          boxLabel="Identify by Plate Number"
          checked={identifyBy === "Plate"}
          onClick={() => setIdentifyBy("Plate")}
          optional={optional}
        />
      </Stack>

      {identifyBy === "VIN" && (
        <Stack direction={sizeUnder.xs ? "column" : "row"} spacing={2}>
          <TextInput
            // required={!optional}
            label="VIN"
            value={vin}
            setValue={setVin}
            optional
          />
          {tellUsMoreRadio ? (
            <RadioInput
              label="Vehicle Damage"
              boxLabel="Tell us where the damage is"
              checked={shareDamage}
              onClick={() => setShareDamage((prev) => !prev)}
              optional
            />
          ) : (
            <Stack sx={{ width: "100%" }} />
          )}
        </Stack>
      )}

      {identifyBy === "Plate" && (
        <Stack spacing={2}>
          <Stack direction={sizeUnder.xs ? "column" : "row"} spacing={2}>
            <TextInput
              // required={!optional}
              label="Plate Number"
              value={plate}
              setValue={setPlate}
              optional
            />
            <TextInput
              // required={!optional}
              label="Zipcode"
              value={zip}
              setValue={setZip}
              optional
            />
          </Stack>

          {tellUsMoreRadio && (
            <Stack direction={sizeUnder.xs ? "column" : "row"} spacing={2}>
              <RadioInput
                label="Vehicle Damage"
                boxLabel="Tell us where the damage is"
                checked={shareDamage}
                onClick={() => setShareDamage((prev) => !prev)}
                optional={optional}
              />
              <Stack sx={{ width: "100%" }}></Stack>
            </Stack>
          )}
        </Stack>
      )}
    </Stack>
  );
};
