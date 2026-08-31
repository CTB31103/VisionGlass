import { Stack } from "@mui/material";
import { TBody } from "./TBody";

type LabledRowTextProps = {
  bold: string;
  text: string;
  larger?: boolean;
  allBold?: boolean;
};

export const LabledRowText = ({
  bold,
  text,
  larger,
  allBold,
}: LabledRowTextProps) => {
  return (
    <Stack spacing={1} direction={"row"}>
      <TBody medium={!larger} large={larger} bold>
        {bold}
      </TBody>
      <TBody medium={!larger} bold={allBold} large={larger}>
        {text}
      </TBody>
    </Stack>
  );
};
