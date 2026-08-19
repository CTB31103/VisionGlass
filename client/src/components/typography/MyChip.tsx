import React from "react";
import { Icons, type IconType } from "../icons";
import { Stack } from "@mui/material";
import { CSS } from "@/Constants";
import { TBody } from "./TBody";

type MyChipProps = {
  text: string;
  Icon?: IconType;
};

export const MyChip = ({ text, Icon }: MyChipProps) => {
  return (
    <Stack
      direction={"row"}
      sx={{
        borderWidth: 1,
        borderColor: CSS.colors.black,
        p: 1,
        borderRadius: 2,
        color: CSS.colors.black,

        alignItems: "center",
      }}
      spacing={1}
    >
      {!Icon && (
        <Stack
          sx={{
            width: 15,
            height: 15,
            bgcolor: CSS.colors.darkGrey,
            borderRadius: 100,
          }}
        />
      )}
      {Icon && <Icon />}
      <TBody>{text}</TBody>
    </Stack>
  );
};
