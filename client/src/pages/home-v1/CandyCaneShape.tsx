import { CSS } from "@/Constants";
import { useWindowDimensions } from "@/hooks";
import { Layer, Shape, Stage } from "react-konva";

type CandyCaneShapeProps = {
  color?: string;
  flipped?: boolean;
  zIndex?: number;
  translateY?: number;
  angleAmp?: number;
  heightAmp?: number;
};

export const CandyCaneShape = ({
  zIndex = 0,
  flipped,
  color = CSS.hex.grey,
  translateY = 0,
  angleAmp = 1,
  heightAmp = 1,
}: CandyCaneShapeProps) => {
  const { width, height } = useWindowDimensions();

  const windowWidth = width;
  const windowHeight = height * heightAmp;
  const denominator = 5 * angleAmp;
  return (
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
            context.lineTo(0, (windowHeight / denominator) * (denominator - 1));
            context.lineTo(windowWidth, windowHeight);
            context.lineTo(windowWidth, windowHeight / denominator);
            context.closePath();
            context.fillStrokeShape(shape);
          }}
          fill={color}
        />
      </Layer>
    </Stage>
  );
};
