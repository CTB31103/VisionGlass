import { Stack } from "@mui/material";
import { useState } from "react";
import { TBody } from "./TBody";
import { CSS } from "@/Constants";
import { useDimensions, useTimeoutEffect } from "@/hooks";

type ReadMoreProps = {
  text: string;
  trunk?: number;
  readMoreText?: string;
  readLessText?: string;
};

export const ReadMore = ({
  text,
  trunk = 3,
  readMoreText = "See More",
  readLessText = "See Less",
}: ReadMoreProps) => {
  const [open, setOpen] = useState(false);
  const [trunkRef, trunkDims] = useDimensions();
  const [regRef, regDims] = useDimensions();
  const [canExpand, setCanExpand] = useState(false);

  useTimeoutEffect(
    () => {
      if (trunkDims.height < regDims.height) setCanExpand(true);
    },
    [trunkDims.height, regDims.height],
    100,
  );

  return (
    <Stack sx={{ width: "100%", position: "relative" }}>
      <Stack
        ref={regRef}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <TBody>{text}</TBody>
      </Stack>

      <Stack
        ref={trunkRef}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <TBody trunk={trunk}>{text}</TBody>
      </Stack>

      <TBody trunk={open ? undefined : trunk}>{text}</TBody>

      {canExpand && (
        <Stack sx={{ width: "100%", alignItems: "end" }}>
          <Stack
            onClick={() => setOpen((prev) => !prev)}
            sx={{ cursor: "pointer" }}
          >
            <TBody bold={!open} color={CSS.colors.blue}>
              {open ? readLessText : readMoreText}
            </TBody>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
