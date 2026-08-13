import { CSS } from "@/Constants";
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
  return (
    <Stack
      sx={{
        minHeight: "70vh",
        padding: 8,

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
          p: 5,
          alignItems: "center",

          borderTopLeftRadius: 25,
          borderBottomRightRadius: 25,
          maxWidth: small ? "40%" : "55%",
        }}
        spacing={4}
      >
        {children}
      </Stack>
    </Stack>
  );
};
