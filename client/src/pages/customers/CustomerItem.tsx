import { Divider, Icons, MyChip, TBody, THeading } from "@/components";
import { CSS } from "@/Constants";
import { useDimensions } from "@/hooks";
import type { CustomerQuoteStatus } from "@/interfaces";
import { capitalize } from "@/utils";
import { Stack } from "@mui/material";

type CustomerItemProps = {
  title: string;
  status: CustomerQuoteStatus;
  employees?: string[];
  divider?: boolean;
  onClick?: () => void;
};

export const CustomerItem = ({
  title,
  status,
  employees,
  divider,
  onClick,
}: CustomerItemProps) => {
  const [circleRef, circleDims] = useDimensions();
  const circleColor =
    status === "new"
      ? CSS.colors.red
      : status === "done"
        ? CSS.colors.blue
        : CSS.colors.darkGrey;
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Stack
        sx={{
          width: "100%",
          cursor: "pointer",
          justifyContent: "space-between",

          // bgcolor: "green",

          "&:hover": {
            color: CSS.colors.blue,
          },
        }}
        direction={"row"}
        onClick={onClick}
      >
        <Stack spacing={1}>
          <THeading bold>{title}</THeading>
          <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={1}>
            <Stack
              ref={circleRef}
              sx={{
                width: circleDims.height,
                height: "50%",
                borderRadius: 15,
                bgcolor: circleColor,
              }}
            />
            <TBody bold medium color={circleColor}>
              {capitalize(status.replaceAll("_", " "))}
            </TBody>
          </Stack>
          <Stack direction={"row"}>
            <MyChip Icon={Icons.Sales} text="William McNerney" />
          </Stack>
        </Stack>

        <Stack sx={{ justifyContent: "center" }}>
          <Icons.ChevronRight />
        </Stack>
      </Stack>

      {divider && <Divider />}
    </Stack>
  );
};
