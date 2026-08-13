import { CSS } from "@/Constants";
import { useDimensions } from "@/hooks";
import { Stack } from "@mui/material";
import { type PropsWithChildren, type ReactNode } from "react";
import { TBody } from "./TBody";

export type NumberedItemProps = {
  Icon?: ReactNode;
  number?: number;
  active?: boolean;
  smallNumber?: boolean;
  text?: string;
  onClick?: () => void;
};

export const NumberedItem = ({
  Icon,
  number,
  smallNumber,
  active,
  text,
  children,
  onClick,
}: PropsWithChildren<NumberedItemProps>) => {
  const [squareRef, squareDims] = useDimensions();
  return (
    <Stack
      direction={"row"}
      spacing={4}
      onClick={onClick}
      sx={{ cursor: onClick ? "pointer" : undefined }}
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
          p: 2,
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
      {children ?? <TBody>{text}</TBody>}
    </Stack>
  );
};
