import { IMAGES } from "@/assets";
import {
  FullPage,
  HeroImageWithForm,
  NumberedItem,
  OurServices,
  StoneBackground,
  TBody,
  THeading,
} from "@/components";
import { Stack } from "@mui/material";
import { WhyChooseUs } from "./WhyChooseUs";
import { useScreenSize } from "@/hooks";

export const ServicesPage = () => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  return (
    <FullPage screen className="relative">
      <HeroImageWithForm src={IMAGES.Service_MB_Rect}>
        <Stack
          sx={{
            paddingInline: sizeUnder.sm ? 1 : 4,
            pt: sizeUnder.sm ? 4 : undefined,
          }}
        >
          <Stack spacing={0}>
            <THeading large thin bungee align="center">
              Full-Service
            </THeading>
            <THeading large thin bungee align="center">
              Auto Glass
            </THeading>
            <THeading large thin bungee align="center">
              Solutions
            </THeading>
          </Stack>
          <TBody medium bungee align="center">
            From windshield replacement to window repair, we've got you covered.
          </TBody>
        </Stack>
      </HeroImageWithForm>

      <Stack
        sx={{
          width: "100%",

          paddingBlock: sizeUnder.sm ? 4 : 8,
          paddingInline: sizeUnder.sm ? 2 : sizeUnder.md ? 4 : 16,
        }}
      >
        <OurServices />
      </Stack>

      <Stack
        sx={{
          width: "100%",

          position: "relative",

          paddingBlock: sizeUnder.sm ? 4 : 8,
          paddingInline: sizeUnder.sm ? 2 : sizeUnder.md ? 4 : 16,
        }}
      >
        <StoneBackground />

        <WhyChooseUs />
      </Stack>

      <Stack
        direction={sizeUnder.sm ? "column" : "row"}
        spacing={sizeUnder.sm ? 2 : 8}
        sx={{
          p: sizeUnder.md ? 4 : 8,
        }}
      >
        <Stack sx={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Stack sx={{ width: sizeUnder.sm ? "75%" : "100%" }}>
            <img src={IMAGES.CartoonInstaller} alt="Windshield installation" />
          </Stack>
        </Stack>

        <Stack spacing={2} sx={{ flex: 1, minHeight: "100%" }}>
          <THeading align={sizeUnder.sm ? "center" : undefined}>
            How does mobile glass service work?
          </THeading>

          <Stack
            spacing={1}
            sx={{
              height: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <NumberedItem
              number={1}
              text="Request a quote online or give us a call to schedule an appointment."
            />
            <NumberedItem
              number={2}
              text="Our expert technicians will drive out to you (mobile service) with everything needed to replace/calibrate/repair your vehicle."
            />
            <NumberedItem
              number={3}
              text="In some cases our technicians can be done in as little as 30 minutes."
            />
          </Stack>
        </Stack>
      </Stack>
    </FullPage>
  );
};
