import { IMAGES } from "@/assets";
import {
  ActionButton,
  CheckmarkItem,
  LargePictureWithCardSection,
  THeading,
} from "@/components";
import { ROUTES } from "@/Constants";
import { useScreenSize } from "@/hooks";
import { Link, Stack } from "@mui/material";

export const WhyChooseUs = () => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  return (
    <LargePictureWithCardSection imageSrc={IMAGES.WindshieldReplacement2}>
      <THeading align={sizeUnder.sm ? "center" : undefined}>
        Why Choose Us
      </THeading>

      <Stack spacing={2}>
        <CheckmarkItem text="We work with insurance to lower your costs" />
        <CheckmarkItem text="We only use OEM (Original Equipment Manufacturer) glass" />
        <CheckmarkItem text="We offer a lifetime warranty on all our service" />
        <CheckmarkItem text="With our mobile service we come to you where you are" />
        <CheckmarkItem text="We're a small buisness expanding to meet you across the east coast" />
      </Stack>
      <Stack sx={{ alignItems: "center" }}>
        <Link href={ROUTES.SERVICES}>
          <ActionButton color="red">View our services</ActionButton>
        </Link>
      </Stack>
    </LargePictureWithCardSection>
  );
  // return (
  //   <Stack
  //     sx={{
  //       minHeight: "70vh",
  //       padding: 8,

  //       backgroundImage: `url(${IMAGES.WindshieldReplacement2})`,
  //       backgroundRepeat: "no-repeat",
  //       backgroundSize: "cover",

  //       alignItems: "start",
  //       justifyContent: "center",
  //     }}
  //   >
  //     <Stack
  //       sx={{
  //         bgcolor: CSS.colors.white,
  //         p: 5,
  //         alignItems: "center",

  //         borderTopLeftRadius: 25,
  //         borderBottomRightRadius: 25,
  //       }}
  //       spacing={4}
  //     ></Stack>
  //   </Stack>
  // );
};
