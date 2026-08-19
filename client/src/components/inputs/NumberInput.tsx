import { useCallback, useState } from "react";
import { TextInput, type TextInputProps } from "./TextInput";
import { useTimeoutEffect, type ISetState } from "@/hooks";

type NumberInputProps = Omit<
  Omit<Omit<TextInputProps, "value">, "setValue">,
  "inputType"
> & {
  value: number;
  setValue: ISetState<number>;

  debounce?: number;
  decimal?: boolean;
  padding?: boolean;
  allowNegative?: boolean;
};

export const NumberInput = (props: NumberInputProps) => {
  const padNum = useCallback((num: number) => {
    if (num === 0) return `0`;
    if (num < 10) return `0${num}`;
    return `${num}`;
  }, []);

  const {
    value,
    setValue,
    debounce = 50,
    decimal,
    padding,
    allowNegative,
  } = props;
  const [stringValue, setStringValue] = useState(
    padding ? padNum(value) : value.toString(),
  );

  useTimeoutEffect(
    () => {
      const number = decimal ? parseFloat(stringValue) : parseInt(stringValue);

      if (Number.isNaN(number)) setValue(0);
      else if (allowNegative || (!allowNegative && number > 0))
        setValue(number);

      if (!allowNegative && number < 0) setStringValue(`0`);
    },
    [stringValue],
    debounce,
  );

  useTimeoutEffect(
    () => {
      const number = decimal ? parseFloat(stringValue) : parseInt(stringValue);
      const strVal = padding ? padNum(value) : value.toString();

      if (value !== number) setStringValue(strVal);
    },
    [value],
    50,
  );

  return (
    <TextInput
      {...props}
      value={stringValue}
      setValue={setStringValue}
      inputType="number"
    />
  );
};
