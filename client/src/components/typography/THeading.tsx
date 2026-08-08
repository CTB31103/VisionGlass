import type { PropsWithChildren } from "react";
import { TEXT_SIZES } from "./textSizes";
import { Text } from "@chakra-ui/react";
import type { TProps } from "./TProps";
import clsx from "clsx";

export const THeading = ({
  children,
  align,
  bungee,
  thin,
}: PropsWithChildren<TProps & { thin?: boolean }>) => {
  return (
    <Text
      fontWeight={"bold"}
      fontSize={TEXT_SIZES.large}
      textAlign={align}
      className={clsx(
        bungee ? (thin ? "bungee-outline-thin" : "bungee-outline") : "",
      )}
    >
      {children}
    </Text>
  );
};
