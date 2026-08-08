import { IMAGES_V1 } from "@/assets";
import { LargeIconCard, QuoteButton } from "@/components";
import { Center, Stack, Box } from "@chakra-ui/react";
import HandymanIcon from "@mui/icons-material/Handyman";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SecurityIcon from "@mui/icons-material/Security";
import { motion } from "motion/react";
import {
  ExactScreenSizeEnums,
  useExactScreenSizeValues,
  useRunAnimationOnce,
  useScreenSize,
  useWindowDimensions,
} from "@/hooks";
import clsx from "clsx";
import ReactCurvedText from "react-curved-text";
import { CSS } from "@/Constants";

const ANIMATION_GO_DURATION = 0.25;
const ANIMATION_CLEAN_DURATION = 0.1;

const useWordAnimation = () => {
  const [wordRef, testWordAnimation] = useRunAnimationOnce({
    runAnimation: (animate) => {
      animate(
        wordRef.current,
        { y: 0, scale: 1.25 },
        { duration: ANIMATION_GO_DURATION },
      );
    },
    resetAnimation: (animate) => {
      animate(
        wordRef.current,
        { y: 150, scale: 0.75 },
        { duration: ANIMATION_CLEAN_DURATION },
      );
    },
    scrollOffset: ["center end", "end end"],
  });

  return {
    wordRef,
    testWordAnimation,
  };
};

const useCardsAnimation = () => {
  const { lessThanEqualTo } = useScreenSize();

  const LEFT_CARD = ".left-card";
  const CENTER_CARD = ".center-card";
  const RIGHT_CARD = ".right-card";

  const [cardContainerRef, testCardAnimation] = useRunAnimationOnce({
    runAnimation: async (animate) => {
      if (lessThanEqualTo.sm) {
        await Promise.all([
          animate(
            LEFT_CARD,
            { x: 0, rotate: "0deg" },
            { duration: ANIMATION_GO_DURATION, delay: 0 },
          ),
          animate(
            CENTER_CARD,
            { x: 0, rotate: "0deg" },
            { duration: ANIMATION_GO_DURATION, delay: 0.2 },
          ),
          animate(
            RIGHT_CARD,
            { x: 0, rotate: "0deg" },
            { duration: ANIMATION_GO_DURATION, delay: 0.4 },
          ),
        ]);
        return;
      }

      await Promise.all([
        animate(
          LEFT_CARD,
          { x: 0, rotate: "0deg" },
          { duration: ANIMATION_GO_DURATION },
        ),
        animate(
          RIGHT_CARD,
          { x: 0, rotate: "0deg" },
          { duration: ANIMATION_GO_DURATION },
        ),
      ]);
    },
    resetAnimation: async (animate) => {
      if (lessThanEqualTo.sm) {
        await Promise.all([
          animate(
            LEFT_CARD,
            { x: "-250%", rotate: "0deg" },
            { duration: ANIMATION_CLEAN_DURATION },
          ),
          animate(
            CENTER_CARD,
            { x: "250%", rotate: "0deg" },
            { duration: ANIMATION_CLEAN_DURATION },
          ),
          animate(
            RIGHT_CARD,
            { x: "-250%", rotate: "0deg" },
            { duration: ANIMATION_CLEAN_DURATION },
          ),
        ]);
        return;
      }

      await Promise.all([
        animate(
          LEFT_CARD,
          { x: "75%", rotate: "-15deg" },
          { duration: ANIMATION_CLEAN_DURATION },
        ),
        animate(
          RIGHT_CARD,
          { x: "-75%", rotate: "15deg" },
          { duration: ANIMATION_CLEAN_DURATION },
        ),
      ]);
    },
    scrollOffset: lessThanEqualTo.sm
      ? ["start end", "end center"]
      : ["start end", "end end"],
    startAnimationAfter: lessThanEqualTo.sm ? 0.25 : 0.75,
  });

  return {
    cardContainerRef,
    testCardAnimation,
  };
};

export const HomeServicesSection = () => {
  const { exactScreenSizeValues } = useExactScreenSizeValues();
  const { lessThanEqualTo } = useScreenSize();
  const { width: windowWidth } = useWindowDimensions();

  const { wordRef } = useWordAnimation();
  const { cardContainerRef } = useCardsAnimation();

  const textWidth = exactScreenSizeValues(
    [ExactScreenSizeEnums.xs],
    [windowWidth],
    windowWidth,
  );
  const textHeight = exactScreenSizeValues(
    [ExactScreenSizeEnums.xs, ExactScreenSizeEnums.sm],
    [30, 50],
    80,
  );

  return (
    <Stack className="relative" gap={lessThanEqualTo.sm ? 5 : 20}>
      <Stack className="w-full" gap={lessThanEqualTo.sm ? undefined : 5}>
        <motion.div ref={wordRef} className="relative w-full" layout>
          <ReactCurvedText
            width={textWidth}
            height={textHeight}
            cx={textWidth / 2}
            cy={textHeight / 3}
            rx={textWidth / 2}
            ry={textHeight / 2}
            startOffset={exactScreenSizeValues([], [], textWidth / 2)}
            reversed={false}
            text="Yea we're into glass play"
            textProps={{
              className: "bungee-outline text-white",
              style: {
                fontSize: exactScreenSizeValues(
                  [
                    [0, 350],
                    [350, ExactScreenSizeEnums.xs[1]],
                    ExactScreenSizeEnums.sm,
                    ExactScreenSizeEnums.md,
                  ],
                  [
                    "var(--chakra-font-sizes-md)",
                    "var(--chakra-font-sizes-lg)",
                    "var(--chakra-font-sizes-4xl)",
                    "var(--chakra-font-sizes-5xl)",
                  ],
                  "var(--chakra-font-sizes-6xl)",
                ),
                textAnchor: exactScreenSizeValues([], [], "middle"),
              },
            }}
            textPathProps={{
              fill: CSS.hex.white,
              stroke: CSS.hex.black,
              strokeWidth: lessThanEqualTo.sm ? 1 : 2,
            }}
          />
        </motion.div>

        <Center
          className="relative"
          gap={lessThanEqualTo.sm ? 0 : 5}
          flexDirection={"column"}
        >
          <Center className="relative z-2 flex w-full overflow-hidden">
            <img
              className={clsx(lessThanEqualTo.sm ? "w-[90vw]" : "w-[70vw]")}
              src={IMAGES_V1.FilledGlass}
              alt={"Vision Auto Glass - Car Windshield"}
            />
          </Center>
        </Center>
      </Stack>

      <Center className="w-full">
        <Box
          ref={cardContainerRef}
          className={clsx(
            lessThanEqualTo.sm
              ? "w-full flex flex-col gap-y-2.5"
              : "w-[80vw] gap-5 flex row justify-between items-center",
          )}
          paddingInline={lessThanEqualTo.sm ? 10 : undefined}
        >
          <motion.div
            layout
            className={clsx("flex-[.33] left-card service-card")}
          >
            <LargeIconCard
              icon={(styles) => <HandymanIcon style={styles} />}
              small
              title="Repair"
              desc="No matter the damage, if its glass we can repair it or replace it!"
            />
          </motion.div>
          <motion.div
            className={clsx("relative z-2 flex-[.33] center-card service-card")}
          >
            <LargeIconCard
              icon={(styles) => <DirectionsCarIcon style={styles} />}
              title="Installation"
              desc="Our expert technicians will provide excellent quality installation!"
            />
          </motion.div>
          <motion.div
            className={clsx("relative z-1 flex-[.33] right-card service-card")}
          >
            <LargeIconCard
              icon={(styles) => <SecurityIcon style={styles} />}
              small
              title="Protection"
              desc="We guarantee that when your car leaves us its more secure than before!"
            />
          </motion.div>
        </Box>
      </Center>

      <QuoteButton text="Get your FREE quote NOW!" />
    </Stack>
  );
};
