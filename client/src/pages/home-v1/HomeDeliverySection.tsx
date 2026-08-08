import { IMAGES_V1 } from "@/assets";
import {
  ExactScreenSizeEnums,
  useExactScreenSizeValues,
  useScreenSize,
  useTimeoutEffect,
} from "@/hooks";
import { Stack, Box, Center, Heading } from "@chakra-ui/react";
import clsx from "clsx";
import { motion, useAnimate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

export const HomeDeliverySection = () => {
  const { exactScreenSizeValues } = useExactScreenSizeValues();
  const { lessThanEqualTo } = useScreenSize();

  const runningRef = useRef(false);
  const [containerRef, animate] = useAnimate();
  const inView = useInView(containerRef, {
    amount: 0.5,
  });

  const [runCount, setRunCount] = useState(0);

  const animateIn = async () => {
    runningRef.current = true;
    await animate(".delivery-van", { x: "-250%" }, { duration: 0 });

    await animate(".delivery-van", { x: 0 }, { duration: 0.8 });

    await animate(
      ".delivery-van",
      { rotate: ["5deg", "-15deg", "0deg", "-5deg", "0deg"] },
      { duration: 0.8, ease: "easeInOut", repeat: 1 },
    );

    await animate(".delivery-van", { x: "250%" }, { duration: 0.45 });

    await animate(".delivery-van", { x: "-250%" }, { duration: 0 });

    runningRef.current = false;
    setRunCount((prev) => prev + 1);
  };

  useTimeoutEffect(
    () => {
      if (!inView || runningRef.current) return;

      animateIn();
    },
    [runCount],
    2500,
  );

  useEffect(() => {
    if (!inView || runningRef.current) return;

    animateIn();
  }, [inView]);

  return (
    <Stack
      gap={lessThanEqualTo.sm ? 10 : 20}
      className="w-full"
      paddingInline={lessThanEqualTo.sm ? 5 : 20}
    >
      <Box className="w-full h-1.25 bg-(--dark-grey)" />
      <Stack gap={10}>
        <Center p={0} className="w-full">
          <Stack p={0}>
            <Heading
              textAlign={"center"}
              className="bungee"
              size={lessThanEqualTo.sm ? "lg" : "3xl"}
            >
              Practically
            </Heading>
            <Heading
              textAlign={"center"}
              className="bungee"
              size={lessThanEqualTo.sm ? "5xl" : "6xl"}
            >
              Wherever you are,
              <br />
              we'll be there
            </Heading>
          </Stack>
        </Center>

        <Center ref={containerRef} className="w-full overflow-hidden">
          <motion.div
            className={clsx(
              "delivery-van origin-bottom-left h-fit",
              exactScreenSizeValues(
                [ExactScreenSizeEnums.xs, ExactScreenSizeEnums.sm],
                ["w-[75%] max-w-[75%]", "w-[50%] max-w-[50%]"],
                "w-[31.25%] max-w-[31.25%]",
              ),
            )}
          >
            <motion.img
              className="w-full h-full object-fill "
              src={IMAGES_V1.DeliveryVan}
              alt=""
            />
          </motion.div>
        </Center>

        <Center p={0} className="w-full">
          <Stack p={0}>
            <Heading
              textAlign={"center"}
              className="bungee"
              size={lessThanEqualTo.sm ? "5xl" : "6xl"}
            >
              Our experts will drive
              <br />
              to you!
            </Heading>
            <Heading
              textAlign={"center"}
              className="bungee"
              size={lessThanEqualTo.sm ? "lg" : "3xl"}
            >
              Serving upstate new york
              <br />
              and further on special request
            </Heading>
          </Stack>
        </Center>
      </Stack>
      <Box className="w-full h-1.25 bg-(--dark-grey)" />
    </Stack>
  );
};
