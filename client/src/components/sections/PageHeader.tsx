import { Stack } from "@mui/material";
import { TEXT_SIZES, THeading } from "../typography";
import { IconButton } from "../buttons";
import { Icons } from "../icons";
import { CSS } from "@/Constants";

type PageHeaderProps = {
  text: string;
  onGoBack?: () => void;
};

export const PageHeader = ({ text, onGoBack }: PageHeaderProps) => {
  return (
    <Stack
      sx={{
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <THeading bungeeFill large>
        {text}
      </THeading>

      {onGoBack && (
        <Stack
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            alignItems: "center",
          }}
          direction={"row"}
        >
          <IconButton
            color={CSS.colors.black}
            onClick={onGoBack}
            Icon={Icons.ChevronLeft}
            fontSize={TEXT_SIZES.medium2}
          />
        </Stack>
      )}
    </Stack>
  );
};
