import { Stack } from "@mui/material";
import { BackgroundShape } from "./BackgroundShape";
import { CSS } from "@/Constants";

type SquareImageShapeProps = {
  imageSrc?: string;
  alt?: string;
};

export const SquareImageShape = ({ imageSrc, alt }: SquareImageShapeProps) => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",

        pr: 8,

        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        style={{
          width: "75%",
          height: "75%",
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
          <Stack sx={{ width: "75%", height: "75%", pr: 7 }}>
            <Stack {...register} sx={{ pr: 1, width: "100%", height: "100%" }}>
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
