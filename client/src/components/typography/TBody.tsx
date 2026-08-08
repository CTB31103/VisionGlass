import { Text } from "@chakra-ui/react";
import { type PropsWithChildren } from "react";
import { TEXT_SIZES } from "./textSizes";
import type { TProps } from "./TProps";
import clsx from "clsx";

export const TBody = ({
  children,
  align,
  bungee,
  large,
  medium,
  bold,
  innerHtml,
}: PropsWithChildren<
  TProps & {
    large?: boolean;
    medium?: boolean;
  }
>) => {
  return (
    <Text
      fontSize={
        large
          ? TEXT_SIZES.medium2
          : medium
            ? TEXT_SIZES.medium1
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
    >
      {children}
    </Text>
  );
};
