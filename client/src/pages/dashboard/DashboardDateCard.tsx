import { TBody, THeading } from "@/components";
import { CSS } from "@/Constants";
import { toReadableDate } from "@/utils";
import { Box, Chip, Stack } from "@mui/material";
import moment from "moment";
import { useState } from "react";

type DashboardDateCardProps = {
  date: Date;
  expanded?: boolean;
  hasEvents?: boolean;
  active?: boolean;
  onClick?: () => void;
};

export const DashboardDateCard = ({
  date,
  expanded,
  hasEvents,
  active,
  onClick,
}: DashboardDateCardProps) => {
  const [today, _] = useState(new Date());
  const mDate = moment(date);

  const month = mDate.format("MMM");
  const num = mDate.date();
  const day = mDate.format("ddd");
  const circleSize = 10;

  return (
    <Stack
      sx={{
        position: "relative",
        flex: 1,
        height: "100%",
        justifyContent: "center",
      }}
      direction={"column"}
      spacing={1}
    >
      {(hasEvents || expanded) && (
        <Stack
          sx={{
            width: "100%",
            opacity: hasEvents ? 1 : 0,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              bgcolor: CSS.colors.blue,
              width: circleSize,
              height: circleSize,
              borderRadius: 10,
            }}
          />
        </Stack>
      )}
      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "center",
          borderWidth: active ? 4 : 1,
          borderColor: active ? CSS.colors.blue : CSS.colors.black,
          paddingBlock: 2,
          borderRadius: 5,
          height: "min-content",

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

      {toReadableDate(date, false) === toReadableDate(today, false) && (
        <Stack
          sx={{
            width: "100%",
          }}
        >
          <Chip variant="outlined" label="Today" />
        </Stack>
      )}
    </Stack>
  );
};
