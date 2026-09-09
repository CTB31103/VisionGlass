import { Stack } from "@mui/material";
import { useState } from "react";
import { TextInput, type TextInputProps } from "./TextInput";
import { BorderButton } from "../buttons";
import { Icons } from "../icons";
import { useScreenSize } from "@/hooks";

export const ToggleSecureTextInput = (
  props: TextInputProps & { iconLeft?: boolean; iconRight?: boolean },
) => {
  const [secure, setSecure] = useState(props.secure);
  const { lessThanEqualTo } = useScreenSize();
  const { iconLeft, iconRight = !iconLeft ? true : false } = props;

  return (
    <Stack
      sx={{ width: "100%", alignItems: lessThanEqualTo.xs ? "end" : "center" }}
      spacing={lessThanEqualTo.xs ? 1 : 2}
      direction={lessThanEqualTo.xs ? "column" : "row"}
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
