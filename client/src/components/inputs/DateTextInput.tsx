import { IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { TextInput, type TextInputProps } from "./TextInput";
import { Icons } from "../icons";
import {
  fromReadableDate,
  isValidReadableDate,
  toMidnight,
  toReadableDateYY,
} from "@/utils";
import { useTimeoutEffect } from "@/hooks";

type DateTextInputProps = Omit<
  Omit<Omit<TextInputProps, "value">, "setValue">,
  "label"
> & {
  label?: string;
  date?: Date;
  longYear?: boolean;
  allowUndefinedSetter?: boolean;
  setDate: (dt?: Date) => void;
  onCalendar?: () => void;
};

export const DateTextInput = (props: DateTextInputProps) => {
  const {
    date,
    setDate,
    longYear = true,
    allowUndefinedSetter,
    onCalendar,
  } = props;
  const [error, setError] = useState<string | undefined>(undefined);
  const [dateStr, setDateStr] = useState(date ? toReadableDateYY(date) : "");

  useTimeoutEffect(
    () => {
      const isValid = isValidReadableDate(dateStr, longYear);
      if (isValid) {
        const dateFromStr = toMidnight(fromReadableDate(dateStr, longYear));
        if (
          !(
            date &&
            toReadableDateYY(date, false) ===
              toReadableDateYY(dateFromStr, false)
          )
        )
          setDate(dateFromStr);
      }

      if (dateStr.length === 0 && allowUndefinedSetter) setDate(undefined);
    },
    [dateStr],
    250,
  );

  useTimeoutEffect(
    () => {
      if (dateStr.length > 0 && !isValidReadableDate(dateStr, longYear)) {
        setError(`Invalid format, expected: mm/dd/yy${longYear ? "yy" : ""}`);
      }
    },
    [dateStr],
    750,
  );

  useEffect(() => {
    setError(undefined);
  }, [dateStr]);

  useEffect(() => {
    if (date) setDateStr(toReadableDateYY(date, false));
  }, [date ? toReadableDateYY(date, false) : ""]);

  return (
    <Stack sx={{ width: "100%" }}>
      <TextInput
        label="Date:"
        placeholder={`mm/dd/yy${longYear ? "yy" : ""}`}
        endIcon={
          onCalendar ? (
            <IconButton onClick={onCalendar}>
              <Icons.Calendar />
            </IconButton>
          ) : (
            <Icons.Calendar />
          )
        }
        error={error}
        {...props}
        value={dateStr}
        setValue={setDateStr}
      />
    </Stack>
  );
};
