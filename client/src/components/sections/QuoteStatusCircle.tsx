import { useDimensions } from "@/hooks";
import { capitalize, quoteStatusToColor } from "@/utils";
import { Stack } from "@mui/material";
import { TBody } from "../typography";
import type { ICustomerQuote } from "@/interfaces";

export const QuoteStatusCircle = ({
  status,
}: {
  status: ICustomerQuote["status"];
}) => {
  const [circleRef] = useDimensions();
  const circleColor = quoteStatusToColor(status);

  return (
    <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={1}>
      <Stack
        ref={circleRef}
        sx={{
          width: 15,
          height: 15,

          borderRadius: 15,
          bgcolor: circleColor,
        }}
      />
      <TBody bold medium color={circleColor}>
        {capitalize(status.replaceAll("_", " "))}
      </TBody>
    </Stack>
  );
};
