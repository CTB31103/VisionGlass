import type { ReactNode } from "react";
import { InputField } from "./InputField";
import type { InputProps } from "./types";
import { TextField } from "@mui/material";

export type TextInputProps = InputProps & {
  value: string;
  setValue: (value: string) => void;
  multiline?: boolean;
  rows?: number;

  endIcon?: ReactNode;
  startIcon?: ReactNode;
  inputType?: HTMLInputElement["type"];

  keyMappings?: { [key: string]: () => void };
};

export const TextInput = (props: TextInputProps) => {
  const {
    value,
    setValue,
    placeholder,
    secure,
    label: parentlabel,
    optional,
    required,
    multiline,
    rows,

    startIcon,
    endIcon,

    inputType = "text",
    disabled,
    keyMappings = {},
  } = props;

  const label = `${parentlabel}${optional ? ` (optional)` : ``}`;

  return (
    <InputField {...props}>
      <TextField
        fullWidth
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
        placeholder={placeholder}
        label={label}
        type={secure ? "password" : inputType}
        required={required}
        multiline={multiline}
        rows={rows}
        disabled={disabled}
        onKeyDown={(e) => {
          if (keyMappings[e.key]) keyMappings[e.key]();
        }}
        slotProps={{
          input: {
            endAdornment: endIcon,
            startAdornment: startIcon,
          },
        }}
      />
    </InputField>
  );

  // return (
  //   <InputField {...props}>
  //     <Input
  //       focusRingColor={CSS.colors.blue}
  //       type={secure ? "password" : "text"}
  //       placeholder={placeholder}
  //       value={value}
  //       onChange={({ currentTarget: { value } }) => setValue(value)}
  //     />
  //   </InputField>
  // );
};
