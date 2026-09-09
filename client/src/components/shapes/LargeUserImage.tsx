import { CSS } from "@/Constants";
import { Stack } from "@mui/material";
import { Icons } from "../icons";
import { TEXT_SIZES } from "../typography";
import { useDimensions, useScreenSize } from "@/hooks";

type LargeUserImageProps = {
  onUserPhotoClick?: () => void;
};

export const LargeUserImage = ({ onUserPhotoClick }: LargeUserImageProps) => {
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

        cursor: !onUserPhotoClick ? undefined : "pointer",
        color: CSS.colors.black,

        "&:hover": onUserPhotoClick
          ? {
              borderColor: CSS.colors.blue,
              color: CSS.colors.blue,
            }
          : undefined,
      }}
      onClick={onUserPhotoClick}
    >
      <Icons.User sx={{ fontSize: TEXT_SIZES.largest * 1.75 }} />
    </Stack>
  );
};
