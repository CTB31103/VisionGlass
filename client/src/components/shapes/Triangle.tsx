import { Box } from "@chakra-ui/react";
import { Layer, RegularPolygon, Stage } from "react-konva";
import useImage from "use-image";
import { CSS } from "@/Constants";
import clsx from "clsx";
import type { ShapeProps } from "./types";

type TriangleProps = ShapeProps & {
  flipped?: boolean;
  className?: string;
};

export const Triangle = ({
  img,
  size = 1,
  color = CSS.hex.grey,
  borderWidth = 2,
  borderColor = CSS.hex.black,
  flipped,
  className,
  hoverable,
  onClick,
}: TriangleProps) => {
  const [image] = useImage(img ?? "");

  const dimensions = 100 * size;
  const squareDimensions = dimensions + borderWidth * 4;

  const scaleX = image ? dimensions / image.width : 1;
  const scaleY = image ? dimensions / image.height : 1;

  return (
    <Box
      className={clsx(
        "w-min h-min relative",
        flipped ? "rotate-180" : "",
        onClick || hoverable
          ? "pointer-events-none hover:-translate-y-2.5"
          : "",
        onClick ? "cursor-pointer" : "",
        className,
      )}
    >
      <Box
        w={(dimensions / 3) * 2.2}
        h={(dimensions / 3) * 2.2}
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-3 pointer-events-auto"
        onClick={onClick}
      ></Box>
      <Stage
        className="relative z-2"
        width={squareDimensions}
        height={(squareDimensions / 10) * 8.5}
      >
        <Layer>
          <RegularPolygon
            x={squareDimensions / 2}
            y={squareDimensions / 2}
            width={dimensions}
            height={dimensions}
            sides={3}
            radius={dimensions / 2}
            cornerRadius={dimensions / 15}
            fill={img ? undefined : color}
            fillPatternImage={image}
            fillPatternRepeat="no-repeat"
            fillPatternOffset={
              image
                ? {
                    x: image.width / 2,
                    y: image.height / 2,
                  }
                : undefined
            }
            fillPatternScaleX={scaleX}
            fillPatternScaleY={scaleY}
            fillPatternRotation={flipped ? 180 : 0}
          />
        </Layer>
      </Stage>

      <Stage
        style={{ scale: 1 + 0.035 * borderWidth }}
        className="absolute top-[50%] left-[50%] translate-[-50%] z-1 "
        width={squareDimensions}
        height={(squareDimensions / 10) * 8.5}
      >
        <Layer>
          <RegularPolygon
            x={squareDimensions / 2}
            y={squareDimensions / 2}
            width={dimensions}
            height={dimensions}
            sides={3}
            radius={dimensions / 2}
            cornerRadius={dimensions / 15}
            fill={borderColor}
          />
        </Layer>
      </Stage>
    </Box>
  );
};
