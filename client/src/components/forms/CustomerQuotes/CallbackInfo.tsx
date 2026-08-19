import { MultiSelectInput, RadioInput, SelectInput } from "@/components/inputs";
import {
  useScreenSize,
  type UseCreateCustomerQuoteServiceResponse,
} from "@/hooks";
import { Stack } from "@mui/material";

type CallbackInfoProps = {
  state: UseCreateCustomerQuoteServiceResponse["callbackInfo"];
};

export const CallbackInfo = ({
  state: {
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
}: CallbackInfoProps) => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  return (
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
              selectedItem={callbackFrom}
              onSelect={setCallbackFrom}
            />
            <SelectInput
              required
              label="To:"
              items={availableTimes.map((time) => ({ value: time }))}
              selectedItem={callbackTo}
              onSelect={setCallbackTo}
            />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
