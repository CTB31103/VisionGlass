import { Stack } from "@mui/material";
import React, { useState } from "react";
import { TextInput } from "./TextInput";
import { Icons } from "../icons";
import { toReadableDate } from "@/utils";

type DateTextInputProps = {
  date: Date;
  setDate: (dt: Date) => void;
};

export const DateTextInput = ({ date, setDate }: DateTextInputProps) => {
  const [dateStr, setDateStr] = useState(toReadableDate(date));
  return (
    <Stack sx={{ width: "100%" }}>
      <TextInput
        label="Date:"
        placeholder="mm/dd/yyyy"
        value={dateStr}
        setValue={setDateStr}
        endIcon={<Icons.Calendar />}
      />
    </Stack>
  );
};
