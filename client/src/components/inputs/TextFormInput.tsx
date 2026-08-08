import { CSS } from "@/Constants";
import { Input } from "@chakra-ui/react";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import type { InputProps } from "./types";
import { InputField } from "./InputField";

type TextFormInputProps<T extends FieldValues> = UseControllerProps<T> &
  InputProps & {};

export const TextFormInput = <T extends FieldValues>(
  props: TextFormInputProps<T>,
) => {
  const { field, fieldState } = useController(props);
  const { placeholder, secure } = props;

  return (
    <InputField {...props} error={props.error ?? fieldState.error?.message}>
      <Input
        {...field}
        type={secure ? "password" : "text"}
        focusRingColor={CSS.colors.blue}
        placeholder={placeholder}
      />
    </InputField>
  );
};
