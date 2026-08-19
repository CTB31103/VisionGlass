import { Stack } from "@mui/material";
import { useState } from "react";
import { DashboardDateCard } from "./DashboardDateCard";
import moment from "moment";
import { useTimeoutEffect } from "@/hooks";
import { BorderButton, Icons } from "@/components";
import { toMidnight } from "@/utils";

type DashboardCalendarProps = {
  date: Date;
  setDate: (d: Date) => void;
};

export const DashboardCalendar = ({
  date,
  setDate,
}: DashboardCalendarProps) => {
  const [week, setWeek] = useState<Date[]>([]);

  useTimeoutEffect(() => {
    const td = moment(date);
    const dayOfWeek = td.day();

    const sunday = dayOfWeek === 0 ? td : moment(td).subtract(1, "day");
    const weekArr = [];

    for (let i = 0; i < 7; i++) {
      weekArr.push(moment(sunday).add(i, "days").toDate());
    }

    setWeek(weekArr);
  }, []);

  const moveCalendar = (moveWeeks: number) => {
    if (week.length !== 7) return;

    const newWeek = [];
    const sunday = moment(week[0]);

    const newSunday =
      moveWeeks > 0
        ? moment(sunday).add(7 * Math.abs(moveWeeks), "days")
        : moment(sunday).subtract(7 * Math.abs(moveWeeks), "days");

    for (let i = 0; i < 7; i++) {
      newWeek.push(moment(newSunday).add(i, "days").toDate());
    }

    setWeek(newWeek);
  };

  return (
    <Stack spacing={2}>
      <Stack direction={"row"} spacing={2}>
        {week.map((day, i) => (
          <DashboardDateCard
            key={i}
            date={day}
            onClick={() => setDate(toMidnight(day))}
            active={toMidnight(day).getTime() === date.getTime()}
          />
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
