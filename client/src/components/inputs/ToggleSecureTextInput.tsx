import { Stack } from "@mui/material";
import { useState } from "react";
import { TextInput, type TextInputProps } from "./TextInput";
import { BorderButton } from "../buttons";
import { Icons } from "../icons";

export const ToggleSecureTextInput = (
  props: TextInputProps & { iconLeft?: boolean; iconRight?: boolean },
) => {
  const [secure, setSecure] = useState(props.secure);

  const { iconLeft, iconRight = !iconLeft ? true : false } = props;

  return (
    <Stack
      sx={{ width: "100%", alignItems: "center" }}
      spacing={2}
      direction={"row"}
    >
      {iconLeft && (
        <BorderButton onClick={() => setSecure((prev) => !prev)}>
          {secure ? <Icons.HideOn /> : <Icons.HideOff />}
        </BorderButton>
      )}

      <TextInput {...props} secure={secure} />

      {iconRight && (
        <BorderButton onClick={() => setSecure((prev) => !prev)}>
          {secure ? <Icons.HideOn /> : <Icons.HideOff />}
        </BorderButton>
      )}
    </Stack>
  );
};
