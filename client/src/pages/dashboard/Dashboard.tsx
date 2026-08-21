import { Divider, FullPage, PageHeader } from "@/components";
import { Stack } from "@mui/material";
import { DashboardCalendar } from "./DashboardCalendar";
import { DashboardEvents } from "./DashboardEvents";
import { useEffect, useState } from "react";
import { toMidnight, toReadableDate } from "@/utils";
import type { ICalendarEvent } from "@/interfaces";
import { useApi, useRouteDateParam, useTimeoutEffect } from "@/hooks";
import moment from "moment";
import { useUserStore } from "@/stores";

export const Dashboard = () => {
  const { userId } = useUserStore((state) => state.user);
  const {
    snackbar: [_, errorSnack],
    calendarEventRoutes,
  } = useApi();

  const [loading, setLoading] = useState(true);

  const [weeksEvents, setWeeksEvents] = useState<ICalendarEvent[]>([]);
  const [daysEvents, setDaysEvents] = useState<ICalendarEvent[]>([]);

  const [selectedDate, setSelectedDate] = useState(toMidnight(new Date()));
  const [week, setWeek] = useState<Date[]>([]);

  const [paramDate, setParamDate] = useState<Date | undefined>(undefined);

  const getCalendarEventsInBtwn = async ({
    from,
    to,
    forceSelect,
    updateDayEvents = true,
  }: {
    from: number;
    to: number;
    forceSelect?: Date;
    updateDayEvents?: boolean;
  }) => {
    setLoading(true);

    const res = await calendarEventRoutes.getCalendarEventsBtwn({ from, to });
    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    const calEvents = res.data.calendarEvents;
    setWeeksEvents(calEvents);

    if (updateDayEvents)
      setDaysEvents(
        calEvents.filter(
          (wE) =>
            toMidnight(new Date(wE.date)).getTime() ===
            toMidnight(forceSelect ?? selectedDate).getTime(),
        ),
      );
  };

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
    getCalendarEventsInBtwn({
      from: newWeek[0].getTime(),
      to: newWeek[newWeek.length - 1].getTime(),
      updateDayEvents: false,
    });
  };

  const onDelete = async (calendarEventId: string) => {
    setLoading(true);

    const res = await calendarEventRoutes.deleteCalendarEvent(calendarEventId);
    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    getCalendarEventsForWeek(week);
  };

  const getCalendarEventsForWeek = (weekArr: Date[], forceSelect?: Date) =>
    getCalendarEventsInBtwn({
      from: weekArr[0].getTime(),
      to: weekArr[weekArr.length - 1].getTime(),
      forceSelect,
    });

  const createWeek = (forDate: Date = new Date()) => {
    const dayOfWeek = moment(forDate).day();

    const sunday =
      dayOfWeek === 0
        ? moment(forDate)
        : moment(forDate).subtract(dayOfWeek, "day");
    const weekArr = [];

    for (let i = 0; i < 7; i++) {
      weekArr.push(moment(sunday).add(i, "days").toDate());
    }

    return weekArr;
  };

  useRouteDateParam(
    (paramDate) => {
      setParamDate(paramDate);

      const weekArr = createWeek(paramDate);
      setSelectedDate(toMidnight(paramDate));
      setWeek(weekArr);
      getCalendarEventsForWeek(weekArr, paramDate);
    },
    [userId],
  );

  useTimeoutEffect(() => {
    if (paramDate) return;

    const weekArr = createWeek(selectedDate);
    setWeek(weekArr);
    getCalendarEventsForWeek(weekArr);
  }, [userId, paramDate]);

  useEffect(() => {
    setDaysEvents(
      weeksEvents.filter(
        (wE) =>
          toMidnight(new Date(wE.date)).getTime() ===
          toMidnight(selectedDate).getTime(),
      ),
    );
  }, [toReadableDate(selectedDate)]);

  return (
    <FullPage screen>
      <Stack
        sx={{ width: "100%", paddingBlock: 4, paddingInline: 8 }}
        spacing={4}
      >
        <PageHeader text="Dashboard" />

        <DashboardCalendar
          eventDates={weeksEvents.map((evD) =>
            toMidnight(new Date(evD.date)).getTime(),
          )}
          week={week}
          moveCalendar={moveCalendar}
          date={selectedDate}
          setDate={setSelectedDate}
        />

        <Divider />

        <DashboardEvents
          loading={loading}
          date={selectedDate}
          daysEvents={daysEvents}
          onDeleteBtn={onDelete}
        />
      </Stack>
    </FullPage>
  );
};
