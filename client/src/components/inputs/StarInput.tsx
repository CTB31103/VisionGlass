import { Rating, Stack } from "@mui/material";
import { TextInput } from "./TextInput";
import { TEXT_SIZES } from "../typography";

type StarInputProps = {
  value: number;
  setValue: (v: number) => void;
};

export const StarInput = ({ value, setValue }: StarInputProps) => {
  return (
    <Stack sx={{ position: "relative", width: "100%" }}>
      <Stack sx={{ width: "100%", pointerEvents: "none", opacity: 0 }}>
        <TextInput label="" value="" setValue={() => {}} />
      </Stack>

      <Stack
        sx={{
          position: "absolute",
          top: 0,
          left: 0,

          width: "100%",
          height: "100%",

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Rating
          precision={0.5}
          value={value}
          onChange={(_event, newValue) =>
            newValue !== null && setValue(newValue)
          }
          size="large"
          slotProps={{
            root: { sx: { columnGap: 2 } },
            icon: { sx: { fontSize: TEXT_SIZES.large * 1.25 } },
          }}
        />
      </Stack>
    </Stack>
  );
};
