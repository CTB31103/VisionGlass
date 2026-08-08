import { IMAGES_V1 } from "@/assets";
import { QuoteButton, Circle } from "@/components";
import {
  ExactScreenSizeEnums,
  useExactScreenSizeValues,
  useScreenSize,
} from "@/hooks";
import { Center, Stack, Heading, Container, Text } from "@chakra-ui/react";
import clsx from "clsx";

export const HomeCircularImagesSection = () => {
  const { lessThanEqualTo } = useScreenSize();
  const { exactScreenSizeValues } = useExactScreenSizeValues();

  const smallTextSize = exactScreenSizeValues(
    [ExactScreenSizeEnums.xs, ExactScreenSizeEnums.sm, ExactScreenSizeEnums.md],
    [
      "var(--chakra-font-sizes-lg)",
      "var(--chakra-font-sizes-2xl)",
      "var(--chakra-font-sizes-3xl)",
    ],
    "var(--chakra-font-sizes-3xl)",
  );
  const largeTextSize = exactScreenSizeValues(
    [ExactScreenSizeEnums.xs, ExactScreenSizeEnums.sm, ExactScreenSizeEnums.md],
    [
      "var(--chakra-font-sizes-3xl)",
      "var(--chakra-font-sizes-4xl)",
      "var(--chakra-font-sizes-5xl)",
    ],
    "var(--chakra-font-sizes-6xl)",
  );

  const smallCircleSize = exactScreenSizeValues(
    [ExactScreenSizeEnums.xs, ExactScreenSizeEnums.sm],
    [1.5, 3],
    4,
  );
  const largeCircleSize = exactScreenSizeValues(
    [ExactScreenSizeEnums.xs, ExactScreenSizeEnums.sm],
    [2.5, 5],
    7.5,
  );
  return (
    <Center className="w-full">
      <Stack gap={lessThanEqualTo.sm ? 5 : 20} className="w-full">
        <Stack gap={0}>
          <Heading
            textAlign={"center"}
            style={{ fontSize: smallTextSize }}
            className="bungee-outline"
          >
            at
          </Heading>
          <Heading
            textAlign={"center"}
            style={{ fontSize: largeTextSize }}
            className="bungee-outline"
          >
            Vision Auto Glass
          </Heading>
        </Stack>

        <Center className="w-full relative">
          <div
            className={clsx(
              "absolute top-0 left-0",
              lessThanEqualTo.sm ? "translate-x-[0%]" : "translate-x-[30%]",
            )}
          >
            <Circle img={IMAGES_V1.WindowCracked} size={smallCircleSize} />
          </div>
          <div
            className={clsx(
              "absolute bottom-0 left-0",
              lessThanEqualTo.sm ? "translate-x-[0%]" : "translate-x-[30%]",
            )}
          >
            <Circle img={IMAGES_V1.WindowCracked2} size={smallCircleSize} />
          </div>

          <div
            className={clsx(
              "absolute top-0 right-0",
              lessThanEqualTo.sm ? "translate-x-[-0%]" : "translate-x-[-30%]",
            )}
          >
            <Circle img={IMAGES_V1.WindowFixed} size={smallCircleSize} />
          </div>
          <div
            className={clsx(
              "absolute bottom-0 right-0",
              lessThanEqualTo.sm ? "translate-x-[-0%]" : "translate-x-[-30%]",
            )}
          >
            <Circle img={IMAGES_V1.WindowFixed2} size={smallCircleSize} />
          </div>

          <Circle img={IMAGES_V1.WindowInstall2} size={largeCircleSize} />
        </Center>

        <Stack gap={10} className="w-full">
          <Heading
            lineHeight={1}
            textAlign={"center"}
            className="bungee"
            style={{
              fontSize: exactScreenSizeValues(
                [ExactScreenSizeEnums.xs],
                [`calc(${largeTextSize} * 1.25)`],
                `calc(${largeTextSize} * 2.25)`,
              ),
            }}
          >
            your always in
            <br />
            good hands
          </Heading>

          <Container fluid px={lessThanEqualTo.sm ? 10 : 60}>
            <Text
              textAlign={"center"}
              style={{ fontSize: `calc(${smallTextSize} * 1.5) ` }}
            >
              Here we take the stress out of your windshield replacement.
              Whether you need a replacement at work, home, while shopping or
              just about anywhere. We'll come to you with the best and finest
              experience.
            </Text>
          </Container>

          <QuoteButton text="Get your FREE quote NOW!" />
        </Stack>
      </Stack>
    </Center>
  );
};
