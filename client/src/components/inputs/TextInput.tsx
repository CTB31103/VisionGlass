import { CSS } from "@/Constants";
import { Input } from "@chakra-ui/react";
import type { InputProps } from "./types";
import { InputField } from "./InputField";

type TextInputProps = InputProps & {
  value: string;
  setValue: (value: string) => void;
};

export const TextInput = (props: TextInputProps) => {
  const { value, setValue, placeholder, secure } = props;

  return (
    <InputField {...props}>
      <Input
        focusRingColor={CSS.colors.blue}
        type={secure ? "password" : "text"}
        placeholder={placeholder}
        value={value}
        onChange={({ currentTarget: { value } }) => setValue(value)}
      />
    </InputField>
  );
};
