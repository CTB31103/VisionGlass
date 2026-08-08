import { Box, Switch } from "@chakra-ui/react";
import type { InputProps } from "./types";
import { InputField } from "./InputField";

type SwitchInputProps = InputProps & {
  checked: boolean;
  setChecked: (v: boolean) => void;
  name?: string;
};

export const SwitchInput = (props: SwitchInputProps) => {
  const { checked, setChecked, name } = props;
  return (
    <Box pt={3} pb={3}>
      <InputField {...props} orientation={props.orientation ?? "horizontal"}>
        <Switch.Root
          name={name}
          checked={checked}
          onCheckedChange={(e) => setChecked(e.checked)}
        >
          <Switch.HiddenInput />
          <Switch.Control />
        </Switch.Root>
      </InputField>
    </Box>
  );
};
