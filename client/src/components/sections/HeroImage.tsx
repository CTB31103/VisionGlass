import { Box, Stack } from "@mui/material";
import { type PropsWithChildren } from "react";

export const HeroImage = ({
  children,
  src,
}: PropsWithChildren<{ src: string }>) => {
  return (
    <Stack
      direction={"row"}
      sx={{
        position: "relative",
        backgroundImage: `url(${src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        paddingBlock: 4,
        width: "100%",
        alignItems: "center",
        minHeight: "75vh",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          background: `linear-gradient(90deg, rgba(0, 0, 0, 50%) 57%, rgba(255, 255, 255, 0%) 100%);`,
        }}
      />

      <Stack sx={{ width: "100%", height: "100%", zIndex: 2 }}>
        {children}
      </Stack>

      {/* <Stack
        sx={{
          flex: 1,
          zIndex: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack sx={{ width: "80%" }}>
          <RequestCallbackShortForm />
        </Stack>
      </Stack> */}
    </Stack>
  );
};
