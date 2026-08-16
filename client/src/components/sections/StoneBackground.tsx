import { IMAGES } from "@/assets";
import { useScreenSize } from "@/hooks";
import { Box } from "@mui/material";

export const StoneBackground = () => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",

        zIndex: 0,

        backgroundImage: `url(${IMAGES.Stone})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: sizeUnder.xs ? "auto 100%" : "cover",
      }}
    ></Box>
  );
};
