import { Stack } from "@mui/material";
import { type PropsWithChildren } from "react";

export const BackgroundShape = ({
  children,
  percentage = -40,
  activePercentage = -45,
}: PropsWithChildren<{ percentage?: number; activePercentage?: number }>) => {
  return (
    <Stack
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(${percentage}%, ${percentage}%)`,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 0,
        pointerEvents: "all",

        transition: "transform .15s ease-in",

        "&:hover": {
          transform: `translate(${activePercentage}%, ${activePercentage}%)`,
        },
      }}
    >
      {children}
    </Stack>
  );
};
