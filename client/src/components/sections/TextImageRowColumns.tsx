import { Link, Stack } from "@mui/material";
import { SlantedImageShape, SquareImageShape } from "../shapes";
import { TBody, THeading, type TBodyProps } from "../typography";
import { ActionButton } from "../buttons";

type TextImageRowColumnsProps = {
  header: string;
  body: (string | TBodyProps)[];
  reverse?: boolean;

  slantedImageSrc?: string;
  slantedImageAlt?: string;
  imageSrc?: string;
  imageAlt?: string;

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
  btn,
}: TextImageRowColumnsProps) => {
  return (
    <Stack
      direction={reverse ? "row-reverse" : "row"}
      sx={{
        paddingInline: 8,
      }}
      spacing={4}
    >
      <Stack
        sx={{
          flex: 1,
          alignItems: "center",
          paddingBlock: 16,
        }}
        spacing={4}
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

      <Stack sx={{ flex: 1, paddingBlock: 8 }}>
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
  );
};
