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
import { useScreenSize } from "@/hooks";

export const ServicesWindshieldReplacements = () => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();

  return (
    <FullPage screen>
      <HeroImage src={IMAGES.WindshieldReplacement2}>
        <Stack
          sx={{ paddingInline: sizeUnder.xs ? 1 : sizeUnder.sm ? 2 : 8 }}
          spacing={4}
        >
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

      <Stack
        direction={sizeUnder.md ? "column" : "row"}
        sx={{
          paddingInline: sizeUnder.md ? 4 : 8,
          paddingBlock: sizeUnder.sm ? 8 : sizeUnder.md ? 12 : undefined,
        }}
        spacing={sizeUnder.md ? 8 : 2}
      >
        <Stack
          sx={{
            flex: sizeUnder.md ? undefined : 1,
            width: sizeUnder.md ? "100%" : undefined,

            alignItems: sizeUnder.md ? "center" : "start",
            justifyContent: "center",
          }}
        >
          <Stack
            sx={{
              width: sizeUnder.xxs
                ? "100%"
                : sizeUnder.xs
                  ? "90%"
                  : sizeUnder.md
                    ? "50%"
                    : "75%",
              pr: sizeUnder.xs ? 2 : 0,
            }}
          >
            <SquareImageShape
              heightMult={sizeUnder.md ? 0.75 : 1}
              imageSrc={IMAGES.ADAS2}
              alt="ADAS"
            />
          </Stack>
        </Stack>

        <Stack
          sx={{ flex: 1, paddingBlock: sizeUnder.md ? 0 : 16 }}
          spacing={2}
        >
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
          <Stack
            sx={{ width: "100%", alignItems: sizeUnder.xs ? "center" : "end" }}
          >
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
