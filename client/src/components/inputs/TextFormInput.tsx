import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import type { InputProps } from "./types";
import { InputField } from "./InputField";
import { TextField } from "@mui/material";

type TextFormInputProps<T extends FieldValues> = UseControllerProps<T> &
  InputProps & {};

export const TextFormInput = <T extends FieldValues>(
  props: TextFormInputProps<T>,
) => {
  const { field, fieldState } = useController(props);
  const { placeholder, secure, label: parentlabel, required, optional } = props;

  const label = `${parentlabel}${optional ? ` (optional)` : ``}`;

  return (
    <InputField {...props} error={props.error ?? fieldState.error?.message}>
      {/* <Input
        {...field}
        type={secure ? "password" : "text"}
        focusRingColor={CSS.colors.blue}
        placeholder={placeholder}
      /> */}
      <TextField
        {...field}
        fullWidth
        // value={value}
        // onChange={({ target: { value } }) => setValue(value)}
        placeholder={placeholder}
        label={label}
        type={secure ? "password" : "text"}
        required={required}
      />
    </InputField>
  );
};
