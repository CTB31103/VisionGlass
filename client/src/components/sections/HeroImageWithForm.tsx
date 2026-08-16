import { Stack, Box } from "@mui/material";
import { type PropsWithChildren } from "react";
import { RequestCallbackShortForm } from "./RequestCallbackShortForm";
import { useScreenSize } from "@/hooks";

type HeroImageWithFormProps = {
  src: string;
};

export const HeroImageWithForm = ({
  children,
  src,
}: PropsWithChildren<HeroImageWithFormProps>) => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  return (
    <Stack
      direction={sizeUnder.sm ? "column" : "row"}
      sx={{
        position: "relative",
        backgroundImage: `url(${src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        paddingBlock: sizeUnder.sm ? 0 : 8,
        pb: 4,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
      spacing={sizeUnder.sm ? 4 : undefined}
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

      <Stack
        sx={{
          height: "100%",
          zIndex: 2,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {children}
      </Stack>

      <Stack
        sx={{
          zIndex: 2,
          alignItems: "center",
          justifyContent: "center",
          paddingInline: sizeUnder.sm ? 2 : 0,
          width: "100%",
        }}
      >
        <Stack sx={{ width: sizeUnder.sm ? "100%" : "80%" }}>
          <RequestCallbackShortForm />
        </Stack>
      </Stack>
    </Stack>
  );
};
