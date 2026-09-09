import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { SelectInput } from "./SelectInput";
import {
  fromReadableDate,
  fromTimeString,
  toMidnight,
  toNearestHalfHour,
  toNearestHour,
  toReadableDate,
  toTimeString,
} from "@/utils";
import moment from "moment";
import { useScreenSize, type ISetState } from "@/hooks";

type StartEndDate = {
  label?: string;
  value: Date;
  set: ISetState<Date>;
};

type DateSelectInputProps = {
  label?: string;
  date: Date;
  setDate: ISetState<Date>;

  start?: StartEndDate;
  end?: StartEndDate;

  availDates?: Date[];
  availTimes?: string[];

  halfHour?: boolean;

  monthStart?: Date;
  monthRange?: [number, number];
  timeRange?: [number, number];
};

export const DateSelectInput = ({
  label,
  date,
  setDate,
  start,
  end,

  availDates,
  availTimes,

  halfHour,

  monthStart = new Date(),
  monthRange = [0, 2],
  timeRange = [0, 24], // 24 Hour time
}: DateSelectInputProps) => {
  const [availableDates, setAvailableDates] = useState(availDates ?? []);
  const [availableTimes, setAvailableTimes] = useState<string[]>(
    availTimes ?? [],
  );

  const { lessThanEqualTo } = useScreenSize();

  const toNearest = halfHour ? toNearestHalfHour : toNearestHour;

  const createDates = () => {
    const today = moment(toNearest(monthStart));
    const [loopBackFor, loopForwardFor] = monthRange;

    const dates = [];

    if (date.getTime() < toMidnight(today.toDate()).getTime()) {
      dates.push(date);
    }

    for (let i = Math.abs(loopBackFor) * 31; i !== 0; i--) {
      dates.push(moment(today).subtract(i, "days").toDate());
    }
    for (let i = 0; i < Math.abs(loopForwardFor) * 31; i++) {
      dates.push(moment(today).add(i, "days").toDate());
    }

    if (
      date.getTime() >
      toMidnight(moment(dates[dates.length - 1]).add(1, "day")).getTime()
    ) {
      dates.push(date);
    }

    setAvailableDates(dates);
  };

  const createTimes = () => {
    const [lower, upper] = timeRange;

    const times = [];
    for (let i = lower; i < upper; i++) {
      const hour = i % 12 === 0 ? 12 : i % 12;
      times.push(
        `${hour >= 10 ? hour : `0${hour}`}:00 ${i >= 12 ? "pm" : "am"}`,
      );

      if (halfHour) {
        times.push(
          `${hour >= 10 ? hour : `0${hour}`}:30 ${i >= 12 ? "pm" : "am"}`,
        );
      }
    }

    setAvailableTimes(times);
  };

  useEffect(
    () => {
      if (availDates && availDates.length > 0) setAvailableDates(availDates);
      else createDates();
    },
    (availDates ?? []).map((dt) => toReadableDate(dt)),
  );

  useEffect(() => {
    if (availTimes && availTimes.length > 0) setAvailableTimes(availTimes);
    else createTimes();
  }, availTimes ?? []);

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      {availableDates.length > 0 && (
        <SelectInput
          required
          label={label ?? "Date:"}
          selectedItem={toReadableDate(date, false)}
          items={availableDates.map((date) => ({
            value: toReadableDate(date, false),
            text: `${moment(date).format("MMM Do, YYYY")}`,
          }))}
          onSelect={(dateStr) => setDate(fromReadableDate(dateStr))}
        />
      )}

      {(start || end) && availableTimes.length > 0 && (
        <Stack direction={lessThanEqualTo.xs ? "column" : "row"} spacing={2}>
          {start && (
            <SelectInput
              required
              label={start.label ?? "From:"}
              selectedItem={toTimeString(toNearest(start.value))}
              items={availableTimes.map((time) => ({ value: time }))}
              onSelect={(timeStr) =>
                start.set((prev) => fromTimeString(timeStr, prev))
              }
            />
          )}
          {end && (
            <SelectInput
              required
              label={end.label ?? "To:"}
              selectedItem={toTimeString(toNearest(end.value))}
              items={availableTimes.map((time) => ({ value: time }))}
              onSelect={(timeStr) =>
                end.set((prev) => fromTimeString(timeStr, prev))
              }
            />
          )}
        </Stack>
      )}
    </Stack>
  );
};
