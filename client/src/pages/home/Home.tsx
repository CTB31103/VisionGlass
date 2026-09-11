import { IMAGES } from "@/assets";
import {
  FullPage,
  HeroImageWithForm,
  OurServices,
  StoneBackground,
  THeading,
} from "@/components";
import { Stack } from "@mui/material";
import { GoToGlass } from "./GoToGlass";
import { FairsSection } from "./FairsSection";
import { ReviewsSection } from "./ReviewsSection";
import { useScreenSize, useTextSizingService } from "@/hooks";

export const Home = () => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  const TextSize = useTextSizingService();

  return (
    <FullPage screen className="relative">
      <HeroImageWithForm src={IMAGES.WindshieldReplacement}>
        <Stack
          sx={{
            width: sizeUnder.sm ? "100%" : undefined,
            paddingInline: sizeUnder.sm ? 1 : 4,
            pt: sizeUnder.sm ? 4 : undefined,
          }}
        >
          <THeading
            align={sizeUnder.sm ? "center" : "start"}
            bungee
            innerHtml={`If its <span style="font-size: ${TextSize.largest}px">CHIPPED</span>`}
          />
          <THeading
            align={sizeUnder.sm ? "center" : "start"}
            bungee
            innerHtml={`If its <span style="font-size: ${TextSize.largest}px">CRACKED</span>`}
          />
          <THeading
            align={sizeUnder.sm ? "center" : "start"}
            bungee
            innerHtml={`<span style="font-size: ${TextSize.largest}px">VISION GLASS</span>`}
          />
          <THeading
            align={sizeUnder.sm ? "center" : "start"}
            bungee
            innerHtml={`has<span style="font-size: ${TextSize.largest}px">YOUR BACK</span>`}
          />
        </Stack>
      </HeroImageWithForm>

      <GoToGlass />

      <Stack
        sx={{
          width: "100%",

          position: "relative",

          paddingBlock: sizeUnder.sm ? 4 : 8,
          paddingInline: sizeUnder.sm ? 2 : sizeUnder.md ? 4 : 16,
        }}
      >
        <StoneBackground />

        <OurServices bungee />
      </Stack>

      <ReviewsSection />

      <FairsSection />
    </FullPage>
  );
};
