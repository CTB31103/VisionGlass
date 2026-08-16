import { CSS } from "@/Constants";
import { Paper, Stack } from "@mui/material";

import { type IconType } from "../icons";
import { TBody } from "../typography";
import { useDimensions, useScreenSize } from "@/hooks";

const HEIGHT = "50vh";

export type IconCardProps = {
  Icon?: IconType;
  img?: { src: string; alt: string };
  title: string;
  desc: string;
  reverse?: boolean;
};

export const IconCard = ({
  Icon,
  img,
  title,
  desc,
  reverse,
}: IconCardProps) => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();

  const [imageRef, dims] = useDimensions();
  return (
    <Paper
      elevation={2}
      sx={{
        border: 2,
        borderColor: CSS.colors.black,
        borderRadius: 5,
        minHeight: sizeUnder.md ? undefined : HEIGHT,
        height: sizeUnder.md ? undefined : "100%",
      }}
    >
      <Stack
        direction={
          sizeUnder.xs
            ? "column"
            : sizeUnder.md
              ? reverse
                ? "row-reverse"
                : "row"
              : "column"
        }
        spacing={2}
        sx={{
          width: "100%",
          height: "100%",
          p: sizeUnder.md ? 2 : 5,
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <Stack
          sx={{
            width: sizeUnder.xs ? "25vw" : sizeUnder.md ? "10vw" : "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {Icon ? (
            <Icon fontSize={"large"} />
          ) : img ? (
            <div
              ref={imageRef}
              style={{
                width: sizeUnder.md ? "100%" : "75%",
                height: dims.width,
              }}
            >
              <img
                style={{ width: "100%", height: "100%" }}
                src={img.src}
                alt={img.alt}
              />
            </div>
          ) : null}
        </Stack>

        <Stack
          sx={
            sizeUnder.xs
              ? undefined
              : sizeUnder.md
                ? {
                    width: "100%",
                    height: "100%",
                    alignItems: "start",
                    justifyContent: "start",
                  }
                : undefined
          }
        >
          <TBody
            align={sizeUnder.xs ? "center" : sizeUnder.md ? "start" : "center"}
            medium={!sizeUnder.md}
            large={sizeUnder.md}
            bold
          >
            {title}
          </TBody>
          <TBody
            align={sizeUnder.xs ? "center" : sizeUnder.md ? "start" : "center"}
            medium={sizeUnder.md}
          >
            {desc}
          </TBody>
        </Stack>
      </Stack>
    </Paper>
  );
};
