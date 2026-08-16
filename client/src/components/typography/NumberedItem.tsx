import { CSS } from "@/Constants";
import { useDimensions, useScreenSize } from "@/hooks";
import { Stack } from "@mui/material";
import { type PropsWithChildren, type ReactNode } from "react";
import { TBody } from "./TBody";

export type NumberedItemProps = {
  Icon?: ReactNode;
  number?: number;
  active?: boolean;
  smallNumber?: boolean;
  centered?: boolean;
  text?: string;
  onClick?: () => void;
};

export const NumberedItem = ({
  Icon,
  number,
  smallNumber,
  centered,
  active,
  text,
  children,
  onClick,
}: PropsWithChildren<NumberedItemProps>) => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  const [squareRef, squareDims] = useDimensions();
  return (
    <Stack
      direction={centered ? "column" : "row"}
      spacing={sizeUnder.xs ? 1 : 2}
      onClick={onClick}
      sx={{
        cursor: onClick ? "pointer" : undefined,
        alignItems: centered ? "center" : undefined,
      }}
    >
      <Stack
        ref={squareRef}
        sx={{
          border: active ? 2 : 1,
          borderColor: active ? CSS.colors.blue : CSS.colors.black,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
          height: squareDims.width,
          p: sizeUnder.md ? 1.5 : 2,
        }}
      >
        {Icon ?? (
          <TBody
            color={active ? CSS.colors.blue : undefined}
            smaller={smallNumber}
            bold
          >
            {number}
          </TBody>
        )}
      </Stack>
      {children ?? <TBody medium={sizeUnder.sm}>{text}</TBody>}
    </Stack>
  );
};
