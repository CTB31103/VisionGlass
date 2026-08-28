import type { PropsWithChildren } from "react";
import { Text } from "@chakra-ui/react";
import type { TProps } from "./TProps";
import clsx from "clsx";
import { useTextSizingService } from "@/hooks";

export const THeading = ({
  children,
  align,
  bungee,
  thin,
  large,
  innerHtml,
  bungeeFill,
  trunk,
  opacity,
}: PropsWithChildren<TProps & { thin?: boolean; large?: boolean }>) => {
  const TextSize = useTextSizingService();
  return (
    <Text
      fontWeight={"bold"}
      fontSize={large ? TextSize.largest : TextSize.large}
      textAlign={align}
      lineClamp={trunk}
      className={clsx(
        bungeeFill
          ? "bungee"
          : bungee
            ? thin
              ? "bungee-outline-thin"
              : "bungee-outline"
            : "",
      )}
      dangerouslySetInnerHTML={
        innerHtml
          ? {
              __html: innerHtml,
            }
          : undefined
      }
      opacity={opacity}
    >
      {children}
    </Text>
  );
};
