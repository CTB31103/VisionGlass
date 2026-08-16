import { Stack } from "@mui/material";
import { BackgroundShape } from "./BackgroundShape";
import { CSS } from "@/Constants";
import { numStrToNum, useDimensions } from "@/hooks";

type SquareImageShapeProps = {
  imageSrc?: string;
  alt?: string;
  heightMult?: number;
};

export const SquareImageShape = ({
  imageSrc,
  alt,
  heightMult = 1,
}: SquareImageShapeProps) => {
  const [squareRef, squareDimensions] = useDimensions();
  return (
    <Stack
      ref={squareRef}
      sx={{
        width: "100%",
        height: numStrToNum(squareDimensions.width) * heightMult,
        position: "relative",
      }}
    >
      <img
        style={{
          width: "100%",
          height: "100%",

          objectFit: "cover",
          borderTopLeftRadius: 50,
          borderBottomRightRadius: 50,
          zIndex: 1,
          pointerEvents: "none",
        }}
        src={imageSrc}
        alt={alt}
      />
      <BackgroundShape
        HoverTarget={({ register }) => (
          <Stack sx={{ width: "100%", height: "100%" }}>
            <Stack {...register} sx={{ width: "100%", height: "100%" }}>
              <Stack
                sx={{
                  width: "100%",
                  height: "100%",
                  bgcolor: CSS.colors.grey,
                  borderTopLeftRadius: 50,
                  borderBottomRightRadius: 50,
                }}
              ></Stack>
            </Stack>
          </Stack>
        )}
      />
    </Stack>
  );
};
