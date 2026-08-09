import { CSS } from "@/Constants";
import { Paper, Stack } from "@mui/material";

import { type IconType } from "../icons";
import { TBody, THeading } from "../typography";
import { useDimensions } from "@/hooks";

const HEIGHT = "50vh";

export type IconCardProps = {
  Icon?: IconType;
  img?: { src: string; alt: string };
  title: string;
  desc: string;
};

export const IconCard = ({ Icon, img, title, desc }: IconCardProps) => {
  const [imageRef, dims] = useDimensions();
  return (
    <Paper
      elevation={2}
      sx={{
        border: 2,
        borderColor: CSS.colors.black,
        borderRadius: 5,
        minHeight: HEIGHT,
        height: "100%",
      }}
    >
      <Stack
        spacing={2}
        sx={{
          width: "100%",
          height: "100%",
          p: 5,
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <Stack
          sx={{ width: "100%", alignItems: "center", justifyContent: "center" }}
        >
          {Icon ? (
            <Icon fontSize={"large"} />
          ) : img ? (
            <div ref={imageRef} style={{ width: "75%", height: dims.width }}>
              <img
                style={{ width: "100%", height: "100%" }}
                src={img.src}
                alt={img.alt}
              />
            </div>
          ) : null}
        </Stack>

        <Stack>
          <TBody align="center" medium bold>
            {title}
          </TBody>
          <TBody align="center">{desc}</TBody>
        </Stack>
      </Stack>
    </Paper>
  );
};
