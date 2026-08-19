import { TBody, THeading } from "@/components";
import { CSS } from "@/Constants";
import { Stack } from "@mui/material";
import moment from "moment";

type DashboardDateCardProps = {
  date: Date;
  active?: boolean;
  onClick?: () => void;
};

export const DashboardDateCard = ({
  date,
  active,
  onClick,
}: DashboardDateCardProps) => {
  const mDate = moment(date);

  const month = mDate.format("MMM");
  const num = mDate.date();
  const day = mDate.format("ddd");

  return (
    <Stack
      sx={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: active ? 4 : 1,
        borderColor: active ? CSS.colors.blue : CSS.colors.black,
        paddingBlock: 2,
        borderRadius: 5,

        color: active ? CSS.colors.blue : undefined,
        cursor: onClick ? "pointer" : undefined,
      }}
      spacing={0}
      onClick={onClick}
    >
      <TBody bold={active}>{month}</TBody>
      <THeading large bungeeFill>
        {num}
      </THeading>
      <TBody bold={active}>{day}</TBody>
    </Stack>
  );
};
