import { IMAGES } from "@/assets";
import {
  FullPage,
  HeroImageWithForm,
  OurServices,
  TEXT_SIZES,
} from "@/components";
import { Text } from "@chakra-ui/react";
import { Stack } from "@mui/material";
import { GoToGlass } from "./GoToGlass";
import { FairsSection } from "./FairsSection";
import { ReviewsSection } from "./ReviewsSection";

export const Home = () => {
  return (
    <FullPage screen className="relative">
      <HeroImageWithForm src={IMAGES.WindshieldReplacement}>
        <Text fontSize={TEXT_SIZES.large} className="bungee-outline">
          If its <span style={{ fontSize: TEXT_SIZES.largest }}>CHIPPED</span>
          <br />
          If its <span style={{ fontSize: TEXT_SIZES.largest }}>CRACKED</span>
          <br />
          <span style={{ fontSize: TEXT_SIZES.largest }}>VISION GLASS</span>
          <br />
          has <span style={{ fontSize: TEXT_SIZES.largest }}>YOUR BACK</span>
        </Text>
      </HeroImageWithForm>

      <GoToGlass />

      <Stack
        sx={{
          width: "100%",
          minHeight: "90vh",

          backgroundImage: `url(${IMAGES.Stone})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",

          paddingBlock: 8,
          paddingInline: 16,
        }}
      >
        <OurServices bungee />
      </Stack>

      <ReviewsSection />

      <FairsSection />
    </FullPage>
  );
};
