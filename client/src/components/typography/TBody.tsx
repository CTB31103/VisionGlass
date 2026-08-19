import { Text } from "@chakra-ui/react";
import { type PropsWithChildren } from "react";
import type { TProps } from "./TProps";
import clsx from "clsx";
import { useTextSizingService } from "@/hooks";

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
  trunk,
}: TBodyProps) => {
  const TextSizes = useTextSizingService();
  return (
    <Text
      fontSize={
        large
          ? TextSizes.medium2
          : medium
            ? TextSizes.medium1
            : smaller
              ? TextSizes.smaller
              : TextSizes.small
      }
      textAlign={align}
      className={clsx(
        bungee ? "bungee-outline-thin" : "",
        bold ? "font-bold!" : "",
      )}
      lineClamp={trunk}
      dangerouslySetInnerHTML={
        innerHtml
          ? {
              __html: innerHtml,
            }
          : undefined
      }
      color={color}
      textWrap={"wrap"}
    >
      {children}
    </Text>
  );
};
