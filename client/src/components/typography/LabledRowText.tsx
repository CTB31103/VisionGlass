import { Stack } from "@mui/material";
import { TBody } from "./TBody";
import { useScreenSize } from "@/hooks";

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
  const { lessThanEqualTo } = useScreenSize();
  return (
    <Stack spacing={1} direction={lessThanEqualTo.xs ? "column" : "row"}>
      <TBody medium={!larger} large={larger} bold>
        {bold}
      </TBody>
      <TBody medium={!larger} bold={allBold} large={larger}>
        {text}
      </TBody>
    </Stack>
  );
};
