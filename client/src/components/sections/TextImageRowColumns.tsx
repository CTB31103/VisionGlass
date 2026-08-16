import { Link, Stack } from "@mui/material";
import { SlantedImageShape, SquareImageShape } from "../shapes";
import { TBody, THeading, type TBodyProps } from "../typography";
import { ActionButton } from "../buttons";
import { useScreenSize } from "@/hooks";

type TextImageRowColumnsProps = {
  header: string;
  body: (string | TBodyProps)[];
  reverse?: boolean;

  slantedImageSrc?: string;
  slantedImageAlt?: string;
  imageSrc?: string;
  imageAlt?: string;

  translateX?: number;

  btn?: {
    text: string;
    href?: string;
    onClick?: () => void;
    align?: "start" | "center" | "end";
  };
};

export const TextImageRowColumns = ({
  header,
  body,
  reverse,
  slantedImageSrc,
  slantedImageAlt,
  imageSrc,
  imageAlt,
  translateX,
  btn,
}: TextImageRowColumnsProps) => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  return (
    <Stack
      direction={
        sizeUnder.md
          ? reverse
            ? "column-reverse"
            : "column"
          : reverse
            ? "row-reverse"
            : "row"
      }
      sx={{
        paddingInline: sizeUnder.md ? 4 : 8,
        paddingBlock: sizeUnder.md ? 8 : 16,
      }}
      spacing={sizeUnder.xs ? 6 : sizeUnder.md ? 8 : 4}
    >
      <Stack
        sx={{
          flex: 1,
          alignItems: "center",
        }}
        spacing={sizeUnder.sm ? 2 : 4}
      >
        <THeading align="center">{header}</THeading>
        <Stack spacing={2}>
          {body.map((b, i) =>
            typeof b === "string" ? (
              <TBody key={i}>{b}</TBody>
            ) : (
              <TBody key={i} {...b} />
            ),
          )}
        </Stack>

        {btn && (
          <Stack sx={{ width: "100%", alignItems: btn.align }}>
            <Link href={btn.href}>
              <ActionButton color="red" onClick={btn.onClick}>
                {btn.text}
              </ActionButton>
            </Link>
          </Stack>
        )}
      </Stack>

      <Stack
        sx={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack
          sx={{
            position: "relative",
            width: sizeUnder.xxs
              ? "100%"
              : sizeUnder.xs
                ? "90%"
                : sizeUnder.md
                  ? "50%"
                  : "75%",
            transform: translateX ? `translateX(-${translateX}%)` : "",
          }}
        >
          {imageSrc && <SquareImageShape imageSrc={imageSrc} alt={imageAlt} />}

          {slantedImageSrc && (
            <SlantedImageShape
              reverse={reverse}
              imageSrc={slantedImageSrc}
              alt={slantedImageAlt}
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
