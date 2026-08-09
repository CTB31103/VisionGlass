import { IMAGES } from "@/assets";
import {
  FullPage,
  HeroImageWithForm,
  NumberedItem,
  OurServices,
  TBody,
  THeading,
} from "@/components";
import { Stack } from "@mui/material";
import { WhyChooseUs } from "./WhyChooseUs";

export const ServicesPage = () => {
  return (
    <FullPage screen className="relative">
      <HeroImageWithForm src={IMAGES.Service_MB_Rect}>
        <Stack sx={{ paddingInline: 4 }}>
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
          minHeight: "90vh",

          paddingBlock: 8,
          paddingInline: 16,
        }}
      >
        <OurServices />
      </Stack>

      <Stack
        sx={{
          width: "100%",

          backgroundImage: `url(${IMAGES.Stone})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",

          paddingBlock: 8,
          paddingInline: 16,
        }}
      >
        <WhyChooseUs />
      </Stack>

      <Stack
        direction={"row"}
        spacing={8}
        sx={{
          minHeight: "70vh",
          p: 8,
        }}
      >
        <Stack sx={{ flex: 1 }}>
          <img src={IMAGES.CartoonInstaller} alt="Windshield installation" />
        </Stack>

        <Stack spacing={2} sx={{ flex: 1, minHeight: "100%" }}>
          <THeading>How does mobile glass service work?</THeading>

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
