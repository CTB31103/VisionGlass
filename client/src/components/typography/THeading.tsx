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
}: PropsWithChildren<TProps & { thin?: boolean; large?: boolean }>) => {
  const TextSize = useTextSizingService();
  return (
    <Text
      fontWeight={"bold"}
      fontSize={large ? TextSize.largest : TextSize.large}
      textAlign={align}
      className={clsx(
        bungee ? (thin ? "bungee-outline-thin" : "bungee-outline") : "",
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
