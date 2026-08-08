import { CSS } from "@/Constants";
import { Box } from "@chakra-ui/react";
import { Circle as KCircle, Layer, Stage } from "react-konva";
import useImage from "use-image";
import type { ShapeProps } from "./types";

type CircleProps = ShapeProps & {};

export const Circle = ({
  img,
  color = CSS.hex.grey,
  size = 2,
  borderWidth = 2,
  borderColor = CSS.hex.black,
}: CircleProps) => {
  const [image] = useImage(img ?? "");
  const dimensions = 100 * size;
  const squareDimensions = dimensions + borderWidth * 2;

  const scaleX = image ? dimensions / image.width : 1;
  const scaleY = image ? dimensions / image.height : 1;

  return (
    <Box width={"min-content"}>
      <Stage width={squareDimensions} height={squareDimensions}>
        <Layer>
          <KCircle
            x={squareDimensions / 2}
            y={squareDimensions / 2}
            radius={dimensions / 2}
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
            stroke={borderColor}
            strokeWidth={borderWidth}
            width={dimensions}
            height={dimensions}
          />
        </Layer>
      </Stage>
    </Box>
  );
};
