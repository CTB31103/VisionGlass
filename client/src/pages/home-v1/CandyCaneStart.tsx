import { CSS } from "@/Constants";
import { useWindowDimensions } from "@/hooks";
import { Box } from "@chakra-ui/react";
import { Stage, Layer, Shape } from "react-konva";

type CandyCaneStartProps = {
  color?: string;
  flipped?: boolean;
  zIndex?: number;
  translateY?: number;
  angleAmp?: number;
  heightAmp?: number;
};

export const CandyCaneStart = ({
  color = CSS.hex.blue,
  flipped,
  zIndex = 1,
  translateY = 0,
  angleAmp = 1,
  heightAmp = 1,
}: CandyCaneStartProps) => {
  const { width, height } = useWindowDimensions();

  const windowWidth = width;
  const windowHeight = height * heightAmp;
  const denominator = 5 * angleAmp;
  return (
    <Box className="w-full">
      <Stage
        style={{
          position: "relative",
          translate: `0px -${translateY}px`,
          transform: flipped ? "rotateY(180deg)" : undefined,
          zIndex,
        }}
        width={windowWidth}
        height={windowHeight}
      >
        <Layer>
          <Shape
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(0, 0);
              context.lineTo(
                0,
                (windowHeight / denominator) * (denominator - 2),
              );
              context.lineTo(windowWidth, windowHeight);
              context.lineTo(windowWidth, 0);
              context.closePath();
              context.fillStrokeShape(shape);
            }}
            fill={color}
          />
        </Layer>
      </Stage>
    </Box>
  );
};
