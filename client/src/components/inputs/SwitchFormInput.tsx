import {
  Controller,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import type { InputProps } from "./types";
import { SwitchInput } from "./SwitchInput";

type SwitchFormInputProps<T extends FieldValues> = UseControllerProps<T> &
  InputProps & {};

export const SwitchFormInput = <T extends FieldValues>(
  props: SwitchFormInputProps<T>,
) => {
  return (
    <Controller
      {...props}
      render={({ field }) => (
        <SwitchInput
          {...props}
          name={field.name}
          checked={field.value}
          setChecked={(checked) => field.onChange(checked)}
        />
      )}
    />
  );
};
