import { InputField } from "./InputField";
import type { InputProps } from "./types";

import { FormControlLabel, Radio, Stack, TextField } from "@mui/material";

type RadioInputProps = InputProps & {
  checked: boolean;
  boxLabel?: string;
  onClick: () => void;
};

export const RadioInput = (props: RadioInputProps) => {
  const { checked, onClick, label, boxLabel, required } = props;
  return (
    <InputField {...props}>
      <Stack
        sx={{
          position: "relative",
          width: "100%",
        }}
      >
        <TextField
          label={label}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          required={required}
        />

        <Stack
          direction={"row"}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            paddingInline: 2,
            cursor: "pointer",
            pointerEvents: "all",
          }}
          onClick={onClick}
        >
          <FormControlLabel
            slotProps={{
              typography: {
                onClick: onClick,
              },
            }}
            control={
              <Radio
                onMouseEnter={(e) => e.preventDefault()}
                size="small"
                checked={checked}
              />
            }
            label={boxLabel ?? label}
          />
        </Stack>
      </Stack>
    </InputField>
  );
};
