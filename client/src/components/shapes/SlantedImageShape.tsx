import { Stack } from "@mui/material";
import { BackgroundShape } from "./BackgroundShape";
import { IMAGES } from "@/assets";

type SlantedImageShapeProps = {
  imageSrc?: string;
  alt?: string;
  reverse?: boolean;
};

export const SlantedImageShape = ({
  imageSrc,
  alt,
  reverse,
}: SlantedImageShapeProps) => {
  return (
    <Stack
      sx={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",

        pr: reverse ? 0 : 8,
        pl: reverse ? 8 : 0,
      }}
    >
      <Stack
        sx={{
          width: "90%",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          style={{ zIndex: 1, pointerEvents: "none" }}
          src={imageSrc}
          alt={alt}
        />

        <BackgroundShape
          HoverTarget={({ register }) => (
            <img
              {...register}
              src={IMAGES.SlantedShape}
              alt="Hoverable Shape"
            />
          )}
        />
      </Stack>
    </Stack>
  );
};
