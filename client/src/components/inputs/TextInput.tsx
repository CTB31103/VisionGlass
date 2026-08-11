import { InputField } from "./InputField";
import type { InputProps } from "./types";
import { TextField } from "@mui/material";

type TextInputProps = InputProps & {
  value: string;
  setValue: (value: string) => void;
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
        type={secure ? "password" : "text"}
        required={required}
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
