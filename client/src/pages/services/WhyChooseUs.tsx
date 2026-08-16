import { IMAGES } from "@/assets";
import {
  ActionButton,
  IconCard,
  Icons,
  THeading,
  type IconCardProps,
} from "@/components";
import { CSS } from "@/Constants";
import { useScreenSize, useTimeoutEffect } from "@/hooks";
import { Stack } from "@mui/material";
import { useState } from "react";

export const WhyChooseUs = () => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();

  const pageOneCards: IconCardProps[] = [
    {
      title: `Insurance Accepted`,
      desc: `We work with your insurance and handle the claim for you, hassle free.`,
      img: {
        src: IMAGES.IconsCarInsurance,
        alt: `Car Insurance`,
      },
    },
    {
      title: `Speedy Service`,
      desc: `With 30+ years in the industry our expert technicians will have your vehicle back on the road in no time.`,
      img: {
        src: IMAGES.IconsTimer,
        alt: `Timer`,
      },
    },
    {
      title: `Lifetime Warranty`,
      desc: `Lifetime warranty against glass defects or repairs needed for our original work.`,
      img: {
        src: IMAGES.IconsWarranty,
        alt: `Warranty`,
      },
    },
  ];

  const pageTwoCards: IconCardProps[] = [
    {
      title: `OEM Glass`,
      desc: `Our commitment to authenticity ensures that our glass is identical to the original equipment 
manufacturer's specifications.`,
      img: { src: IMAGES.IconsOEM, alt: "OEM Glass" },
    },

    {
      title: `Mobile Delivery`,
      desc: `We bring our mobile service unit directly to you, saving time and hassle with on-site repairs and 
replacements.`,
      img: { src: IMAGES.IconsDeliveryVan, alt: `Mobile delivery` },
    },
    {
      title: `Expert  Technicians`,
      desc: `Our team of experienced technicians delivers unparalleled expertise in auto glass repair and replacement.`,
      img: { src: IMAGES.IconsTechnician, alt: `Expert technicians` },
    },
  ];

  const [cardPageIndex, setCardPageIndex] = useState(0);
  const [debouncedIndex, setDebouncedIndex] = useState(0);

  const allCards = [...pageOneCards, ...pageTwoCards];
  const allPageCards = [pageOneCards, pageTwoCards];
  const pageCards = allPageCards[cardPageIndex];
  const debouncedCards = allPageCards[debouncedIndex];

  useTimeoutEffect(
    () => {
      setDebouncedIndex(cardPageIndex);
    },
    [cardPageIndex],
    100,
  );

  const nextPage = () =>
    setCardPageIndex((prev) =>
      allPageCards.length - 1 === prev ? 0 : prev + 1,
    );
  const lastPage = () =>
    setCardPageIndex((prev) =>
      0 === prev
        ? allPageCards.length - 1 < 0
          ? 0
          : allPageCards.length - 1
        : prev - 1,
    );

  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: "center",
        height: "100%",
        zIndex: 1,
      }}
    >
      <THeading bungee thin>
        Why Choose Us
      </THeading>

      <Stack
        direction={"row"}
        spacing={4}
        sx={{ width: "100%", height: "100%", alignItems: "center" }}
      >
        {!sizeUnder.md && (
          <ActionButton onClick={lastPage} color="red">
            <Icons.ChevronLeft sx={{ color: CSS.colors.white }} />
          </ActionButton>
        )}

        <Stack
          sx={{
            position: "relative",
            flex: 1,
          }}
        >
          {/* Hidden to get initial bounds */}
          <Stack
            direction={sizeUnder.md ? "column" : "row"}
            spacing={2}
            sx={{
              alignItems: "center",
              justifyContent: "space-evenly",
              opacity: sizeUnder.md ? 1 : 0,
            }}
          >
            {(sizeUnder.md ? allCards : debouncedCards).map((props, i) => (
              <Stack
                key={props.title}
                sx={
                  sizeUnder.md ? { width: "100%" } : { flex: 1, height: "100%" }
                }
              >
                <IconCard
                  {...props}
                  reverse={sizeUnder.md ? i % 2 === 1 : undefined}
                />
              </Stack>
            ))}
          </Stack>

          {/* Stretches cards to the same height */}
          {!sizeUnder.md && (
            <Stack
              direction={"row"}
              spacing={2}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              {pageCards.map((props) => (
                <Stack key={props.title} sx={{ flex: 1, height: "100%" }}>
                  <IconCard {...props} />
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>

        {!sizeUnder.md && (
          <ActionButton onClick={nextPage} color="red">
            <Icons.ChevronRight sx={{ color: CSS.colors.white }} />
          </ActionButton>
        )}
      </Stack>
    </Stack>
  );
};
