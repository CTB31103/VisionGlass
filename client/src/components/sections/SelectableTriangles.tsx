import { IMAGES_V1 } from "@/assets";
import { HStack, Box, AbsoluteCenter } from "@chakra-ui/react";
import { Circle, Triangle } from "../shapes";
import { CSS } from "@/Constants";
import clsx from "clsx";
import { ExactScreenSizeEnums, useExactScreenSizeValues } from "@/hooks";

type SelectableTrianglesProps = {
  imgs?: [string, string, string];
  selected?: number;
  setSelected: (value?: number) => void;
};

export const SelectableTriangles = ({
  imgs,
  selected,
  setSelected,
}: SelectableTrianglesProps) => {
  const { exactScreenSizeValues, combineLowHighRanges } =
    useExactScreenSizeValues();

  const SelectedCircle = ({ flipped }: { flipped?: boolean }) => (
    <AbsoluteCenter>
      <Box className={clsx(flipped ? "translate-y-[-5%]" : "translate-y-[5%]")}>
        <Circle
          size={exactScreenSizeValues(
            [[0, 350], ExactScreenSizeEnums.xs, ExactScreenSizeEnums.sm],
            [1.1, 1.15, 2.85],
            3,
          )}
          color={CSS.hex.blue}
          borderWidth={0}
        />
      </Box>
    </AbsoluteCenter>
  );

  const selectedTriangleProps = {
    borderColor: CSS.hex.blue,
    borderWidth: 4,
  };
  const unselectedTriangleProps = {};

  const triangleSize = exactScreenSizeValues(
    [
      [0, 350],
      ExactScreenSizeEnums.xs,
      ExactScreenSizeEnums.sm,
      ExactScreenSizeEnums.md,
    ],
    [1.35, 1.5, 3.65, 3.65],
    4,
  );

  return (
    <HStack
      className="relative w-full"
      gap={0}
      p={0}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Box
        className={clsx(
          "relative w-min h-min",
          selected === 0 ? "z-2" : "",
          exactScreenSizeValues(
            [
              combineLowHighRanges(
                ExactScreenSizeEnums.xs,
                ExactScreenSizeEnums.sm,
              ),
              ExactScreenSizeEnums.md,
            ],
            ["translate-x-[-5vw]", ""],
            "translate-x-[5vw]",
          ),
        )}
      >
        {selected === 0 && <SelectedCircle />}
        <Triangle
          hoverable
          {...(selected === 0
            ? selectedTriangleProps
            : unselectedTriangleProps)}
          img={imgs ? imgs[0] : IMAGES_V1.HappyDriver}
          size={triangleSize}
          onClick={() => setSelected(0)}
        />
      </Box>

      <AbsoluteCenter className={selected === 1 ? "z-2" : ""}>
        <Box className={clsx("relative w-min h-min")}>
          {selected === 1 && <SelectedCircle flipped />}
          <Triangle
            hoverable
            {...(selected === 1
              ? selectedTriangleProps
              : unselectedTriangleProps)}
            flipped
            img={imgs ? imgs[1] : IMAGES_V1.HappyDriver2}
            size={triangleSize}
            onClick={() => setSelected(1)}
          />
        </Box>
      </AbsoluteCenter>

      <Box
        className={clsx(
          "relative w-min h-min",
          selected === 2 ? "z-2" : "",
          exactScreenSizeValues(
            [
              combineLowHighRanges(
                ExactScreenSizeEnums.xs,
                ExactScreenSizeEnums.sm,
              ),
              ExactScreenSizeEnums.md,
            ],
            ["translate-x-[5vw]", ""],
            "translate-x-[-5vw]",
          ),
        )}
      >
        {selected === 2 && <SelectedCircle />}
        <Triangle
          hoverable
          {...(selected === 2
            ? selectedTriangleProps
            : unselectedTriangleProps)}
          img={imgs ? imgs[2] : IMAGES_V1.HappyDriver4}
          size={triangleSize}
          onClick={() => setSelected(2)}
        />
      </Box>
    </HStack>
  );
};
