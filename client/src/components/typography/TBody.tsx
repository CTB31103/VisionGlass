import { Text } from "@chakra-ui/react";
import { type PropsWithChildren } from "react";
import { TEXT_SIZES } from "./textSizes";
import type { TProps } from "./TProps";
import clsx from "clsx";

export type TBodyProps = PropsWithChildren<
  TProps & {
    large?: boolean;
    medium?: boolean;
    smaller?: boolean;
  }
>;

export const TBody = ({
  children,
  align,
  bungee,
  large,
  medium,
  bold,
  innerHtml,
  smaller,
  color,
}: TBodyProps) => {
  return (
    <Text
      fontSize={
        large
          ? TEXT_SIZES.medium2
          : medium
            ? TEXT_SIZES.medium1
            : smaller
              ? TEXT_SIZES.smaller
              : TEXT_SIZES.small
      }
      textAlign={align}
      className={clsx(
        bungee ? "bungee-outline-thin" : "",
        bold ? "font-bold!" : "",
      )}
      dangerouslySetInnerHTML={
        innerHtml
          ? {
              __html: innerHtml,
            }
          : undefined
      }
      color={color}
    >
      {children}
    </Text>
  );
};
