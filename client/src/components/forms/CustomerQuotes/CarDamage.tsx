import { ServiceCard } from "@/components/cards";
import { MultiSelectInput, SelectInput } from "@/components/inputs";
import {
  useDimensions,
  useScreenSize,
  type UseCreateCustomerQuoteServiceResponse,
} from "@/hooks";
import { Stack } from "@mui/material";

type CarDamageProps = {
  state: UseCreateCustomerQuoteServiceResponse["carDamage"];
  optional?: boolean;
};

export const CarDamage = ({
  state: {
    damageMainLocation,
    setDamageMainLocation,
    damageSide,
    setDamageSide,
    damageRows,
    setDamageRows,
    availableDamageOptions,
    availableSides,
    availableRows,
    damageCardSmallTitle,
    damageCardTitle,
    damageImage,
    damageIsSideWindows,
  },
  optional,
}: CarDamageProps) => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  const [serviceCardSquareRef, serviceCardSquareDims] = useDimensions();

  return (
    <Stack
      direction={sizeUnder.xs ? "column-reverse" : "row"}
      spacing={sizeUnder.xs ? 4 : 2}
    >
      <Stack sx={{ width: "100%" }} spacing={2}>
        <SelectInput
          required={!optional}
          optional={optional}
          label="Where is the vehicle damage?"
          items={availableDamageOptions}
          selectedItem={damageMainLocation}
          onSelect={setDamageMainLocation}
        />
        {damageIsSideWindows && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <SelectInput
              required={!optional}
              optional={optional}
              label="Which side is the damage on?"
              items={availableSides.map((option) => ({
                value: option,
              }))}
              selectedItem={damageSide}
              onSelect={setDamageSide}
            />
            <MultiSelectInput
              required={!optional}
              optional={optional}
              label="What row(s) is the damage on?"
              items={availableRows.map((option, i) => ({
                value: (i + 1).toString(),
                text: option,
              }))}
              selectedItems={damageRows.map((d) => d.toString())}
              onSelect={(v) => setDamageRows(v.map((val) => parseInt(val)))}
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
  );
};
