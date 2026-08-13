import { IMAGES } from "@/assets";
import {
  ActionButton,
  FullPage,
  HeroImage,
  OtherServicesSections,
  SquareImageShape,
  TBody,
  THeading,
  WhenToReplaceSection,
} from "@/components";
import { ROUTES } from "@/Constants";
import { Link, Stack } from "@mui/material";
import { WindshieldDangers } from "./WindshieldDangers";

export const ServicesWindshieldReplacements = () => {
  return (
    <FullPage screen>
      <HeroImage src={IMAGES.WindshieldReplacement2}>
        <Stack sx={{ paddingInline: 8 }} spacing={4}>
          <Stack>
            <THeading large bungee>
              Quality
            </THeading>
            <THeading large bungee>
              Windshield Replacements
            </THeading>
            <THeading bungee thin>
              Don't let broken glass ruin your day!
            </THeading>
          </Stack>

          <Link href={ROUTES.QUOTES}>
            <ActionButton color="red">Schedule with us today!</ActionButton>
          </Link>
        </Stack>
      </HeroImage>

      <WindshieldDangers />

      <WhenToReplaceSection />

      <Stack direction={"row"} sx={{ paddingInline: 8 }} spacing={2}>
        <Stack sx={{ flex: 1, maxHeight: "100%", paddingBlock: 8 }}>
          <SquareImageShape imageSrc={IMAGES.ADAS2} alt="Camaro Auto Glass" />
        </Stack>
        <Stack sx={{ flex: 1, paddingBlock: 16 }} spacing={2}>
          <THeading>
            Advanced Driver Assistance Systems (ADAS) Calibration
          </THeading>
          <TBody>
            Did you know that your car's advanced safety features rely on a
            clear view of the road? A cracked windshield may seem like a minor
            issue, but it can have serious consequences on your car's advanced
            safety features, including its ability to detect obstacles and lane
            departure.
          </TBody>
          <TBody>
            Our auto glass repair and replacement services go beyond just fixing
            your windshield - we also ensure that your vehicle's ADAS system is
            calibrated properly after any repairs. With our expert technicians
            using state-of-the-art technology, you can trust that all sensors
            and cameras are working in sync to provide the best possible safety
            features for your car.
          </TBody>
          <Stack sx={{ width: "100%", alignItems: "end" }}>
            <Link href={ROUTES.SERVICE_ADAS}>
              <ActionButton color="red">Learn More</ActionButton>
            </Link>
          </Stack>
        </Stack>
      </Stack>

      <OtherServicesSections ADAS AG CC />
    </FullPage>
  );
};
