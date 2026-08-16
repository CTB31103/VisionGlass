import { IconButton as MIconButton, Stack } from "@mui/material";
import { CSS } from "@/Constants";
import { type IconType } from "../icons";
import { TEXT_SIZES } from "../typography";

type IconButtonProps = {
  fontSize?: number;
  bgcolor?: string;
  borderColor?: string;
  color?: string;
  Icon: IconType;
  onClick?: () => void;
};

export const IconButton = ({
  bgcolor = "transparent",
  borderColor,
  color = CSS.colors.white,
  fontSize = TEXT_SIZES.medium1,
  Icon,
  onClick,
}: IconButtonProps) => {
  return (
    <MIconButton onClick={onClick} sx={{ borderWidth: 1 }}>
      <Stack
        sx={{
          padding: 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
          borderWidth: borderColor ? 1 : 0,
          bgcolor,
          borderColor,
        }}
      >
        <Icon sx={{ fontSize: fontSize, color }} />
      </Stack>
    </MIconButton>
  );
};
