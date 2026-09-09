import { CSS } from "@/Constants";
import { useDimensions, useScreenSize } from "@/hooks";
import { Stack } from "@mui/material";

import { TEXT_SIZES } from "../typography";
import { Icons, type IconType } from "../icons";

type LargeSquareIconProps = {
  Icon: IconType;
  onClick?: () => void;
};

export const LargeSquareIcon = ({
  Icon = Icons.User,
  onClick,
}: LargeSquareIconProps) => {
  const [squareRef, squareDims] = useDimensions();
  const { lessThanEqualTo } = useScreenSize();

  return (
    <Stack
      ref={squareRef}
      sx={{
        minWidth: lessThanEqualTo.xs ? "50vw" : "20vw",
        height: squareDims.width,

        alignItems: "center",
        justifyContent: "center",

        borderWidth: 1,
        borderColor: CSS.colors.black,
        borderRadius: 5,

        cursor: !onClick ? undefined : "pointer",
        color: CSS.colors.black,

        "&:hover": onClick
          ? {
              borderColor: CSS.colors.blue,
              color: CSS.colors.blue,
            }
          : undefined,
      }}
      onClick={onClick}
    >
      <Icon sx={{ fontSize: TEXT_SIZES.largest * 1.75 }} />
    </Stack>
  );
};
