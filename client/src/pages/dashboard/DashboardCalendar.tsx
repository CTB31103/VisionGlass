import { Stack } from "@mui/material";
import { DashboardDateCard } from "./DashboardDateCard";
import { BorderButton, Icons, THeading } from "@/components";
import { toMidnight } from "@/utils";
import moment from "moment";

type DashboardCalendarProps = {
  date: Date;
  setDate: (d: Date) => void;

  eventDates: number[];
  week: Date[];
  moveCalendar: (val: number) => void;
};

export const DashboardCalendar = ({
  date,
  setDate,

  eventDates,
  week,
  moveCalendar,
}: DashboardCalendarProps) => {
  const mStart = week.length > 0 ? moment(week[0]) : undefined;
  const mEnd = week.length > 0 ? moment(week[week.length - 1]) : undefined;
  return (
    <Stack spacing={2}>
      {mStart && mEnd && (
        <Stack sx={{ width: "100%", alignItems: "center" }}>
          <THeading bungeeFill>
            {mStart.month() != mEnd.month()
              ? `${mStart.format("MMM")}-${mEnd.format("MMM")} `
              : `${mStart.format("MMM")} `}
            {`${mStart.year() != mEnd.year() ? `${mStart.format("YY")}-${mEnd.format("YY")}` : `${mStart.format("YYYY")}`}`}
          </THeading>
        </Stack>
      )}

      <Stack
        direction={"row"}
        sx={{
          width: "100%",
          height: "min-content",
        }}
        spacing={2}
      >
        {week.map((day, i) => (
          <Stack key={i} sx={{ height: "max-content", flex: 1 }}>
            <DashboardDateCard
              date={day}
              expanded={eventDates.length > 0}
              hasEvents={eventDates.includes(toMidnight(day).getTime())}
              onClick={() => setDate(toMidnight(day))}
              active={toMidnight(day).getTime() === date.getTime()}
            />
          </Stack>
        ))}
      </Stack>

      <Stack
        direction={"row"}
        sx={{ justifyContent: "space-between", width: "100%" }}
      >
        <BorderButton color={"blue"} onClick={() => moveCalendar(-1)}>
          <Icons.ChevronLeft />
          Prev
        </BorderButton>
        <BorderButton color={"blue"} onClick={() => moveCalendar(1)}>
          Next
          <Icons.ChevronRight />
        </BorderButton>
      </Stack>
    </Stack>
  );
};
