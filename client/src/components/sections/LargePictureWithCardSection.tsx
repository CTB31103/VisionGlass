import { CSS } from "@/Constants";
import { useScreenSize } from "@/hooks";
import { Stack } from "@mui/material";
import { type PropsWithChildren } from "react";

export const LargePictureWithCardSection = ({
  children,
  imageSrc,
  small,
  reverse,
}: PropsWithChildren<{
  imageSrc: string;
  reverse?: boolean;
  small?: boolean;
}>) => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  return (
    <Stack
      sx={{
        padding: sizeUnder.md ? 4 : 8,

        backgroundImage: `url(${imageSrc})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",

        alignItems: reverse ? "end" : "start",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          bgcolor: CSS.colors.white,
          p: sizeUnder.sm ? 2.5 : 5,
          alignItems: "center",

          borderTopLeftRadius: 25,
          borderBottomRightRadius: 25,
          maxWidth: sizeUnder.xs
            ? undefined
            : sizeUnder.md
              ? small
                ? "50%"
                : "65%"
              : small
                ? "40%"
                : "55%",
        }}
        spacing={4}
      >
        {children}
      </Stack>
    </Stack>
  );
};
