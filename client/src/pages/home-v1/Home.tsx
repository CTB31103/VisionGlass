import { FullPage } from "@/components";
import { Box } from "@chakra-ui/react";
import { CandyCaneBg } from "./CandyCaneBg";
import { HomeHeaderSection } from "./HomeHeaderSection";
import { HomeServicesSection } from "./HomeServicesSection";
import { HomeCircularImagesSection } from "./HomeCircularImagesSection";
import { HomeDeliverySection } from "./HomeDeliverySection";
import { HomeReviewsSection } from "./HomeReviewsSection";

export const Home = () => {
  return (
    <FullPage screen className="relative">
      <CandyCaneBg />

      <FullPage className="relative z-2">
        <HomeHeaderSection />

        <Box h={window.innerHeight / 10} />

        <HomeServicesSection />

        <Box h={window.innerHeight / 10} />

        <HomeCircularImagesSection />

        <Box h={window.innerHeight / 10} />

        <HomeDeliverySection />

        <Box h={window.innerHeight / 10} />

        <HomeReviewsSection />

        <Box h={window.innerHeight / 10} />
      </FullPage>
    </FullPage>
  );
};
