import { Link, Stack } from "@mui/material";
import { TEXT_SIZES, THeading } from "../typography";
import { IconButton } from "../buttons";
import { Icons } from "../icons";
import { CSS } from "@/Constants";

type PageHeaderProps = {
  text: string;
  backHref?: string;
  onGoBack?: () => void;
};

export const PageHeader = ({ text, backHref, onGoBack }: PageHeaderProps) => {
  return (
    <Stack
      sx={{
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{ maxWidth: "80%", alignItems: "center", justifyContent: "center" }}
      >
        <THeading align="center" bungeeFill large>
          {text}
        </THeading>
      </Stack>

      {(onGoBack || backHref) && (
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
          <Link underline="none" color="inherit" href={backHref}>
            <IconButton
              color={CSS.colors.black}
              onClick={onGoBack}
              Icon={Icons.ChevronLeft}
              fontSize={TEXT_SIZES.medium2}
            />
          </Link>
        </Stack>
      )}
    </Stack>
  );
};
