import { Switch } from "@chakra-ui/react";
import type { InputProps } from "./types";
import { InputField } from "./InputField";
import { Stack, TextField } from "@mui/material";
import { TBody } from "../typography";

type SwitchInputProps = InputProps & {
  checked: boolean;
  setChecked: (v: boolean) => void;
  name?: string;
};

export const SwitchInput = (props: SwitchInputProps) => {
  const { checked, setChecked, name, label } = props;

  return (
    <InputField {...props}>
      <Stack sx={{ width: "100%", position: "relative" }}>
        <TextField sx={{ opacity: 0 }} />

        <Stack
          direction={"row"}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
            p: 1,
          }}
        >
          <TBody>{label}</TBody>

          <Switch.Root
            name={name}
            checked={checked}
            onCheckedChange={(e) => setChecked(e.checked)}
          >
            <Switch.HiddenInput />
            <Switch.Control />
          </Switch.Root>
        </Stack>
      </Stack>
    </InputField>
  );

  // return (
  //   <Box pt={3} pb={3}>
  //     <InputField {...props} orientation={props.orientation ?? "horizontal"}>
  //       <Switch.Root
  //         name={name}
  //         checked={checked}
  //         onCheckedChange={(e) => setChecked(e.checked)}
  //       >
  //         <Switch.HiddenInput />
  //         <Switch.Control />
  //       </Switch.Root>
  //     </InputField>
  //   </Box>
  // );
};
