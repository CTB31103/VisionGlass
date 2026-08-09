import { CSS } from "@/Constants";
import { useDimensions } from "@/hooks";
import { Stack } from "@mui/material";
import React, { useState } from "react";
import { TBody } from "./TBody";

type NumberedItemProps = {
  number: number;
  text: string;
};

export const NumberedItem = ({ number, text }: NumberedItemProps) => {
  const [squareRef, squareDims] = useDimensions();
  return (
    <Stack direction={"row"} spacing={4}>
      <Stack
        ref={squareRef}
        sx={{
          border: 1,
          borderColor: CSS.colors.black,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
          height: squareDims.width,
          p: 2,
        }}
      >
        <TBody medium bold>
          {number}
        </TBody>
      </Stack>
      <TBody>{text}</TBody>
    </Stack>
  );
};
