import {
  FullPage,
  PageHeader,
  RadioInput,
  SelectInput,
  TextInput,
} from "@/components";
import {
  fromReadableDate,
  fromTimeString,
  toNearestHalfHour,
  toReadableDate,
  toTimeString,
} from "@/utils";
import { Stack } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const DashboardAdd = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [fullDay, setFullDay] = useState(false);
  const [fromDate, setFromDate] = useState(toNearestHalfHour(new Date()));
  const [toDate, setToDate] = useState(toNearestHalfHour(new Date()));
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  useEffect(() => {
    const td = moment(toNearestHalfHour(new Date()));
    const thisMonth = moment(
      toNearestHalfHour(new Date(td.year(), td.month() + 1, 0)),
    );
    const nextMonth = moment(
      toNearestHalfHour(new Date(td.year(), td.month() + 2, 0)),
    );

    const daysInThisMonth = thisMonth.date() - td.date();
    const daysInNextMonth = nextMonth.date();

    const loopFor = Math.max(daysInThisMonth + daysInNextMonth, 31 * 1.5);
    const availDates = [];
    const availTimes = [];

    for (let i = 0; i < loopFor; i++) {
      availDates.push(moment(td).add(i, "days").toDate());
    }

    for (let i = 0; i < 24; i++) {
      const hour = i % 12 === 0 ? 12 : i % 12;
      availTimes.push(
        `${hour >= 10 ? hour : `0${hour}`}:00 ${i >= 12 ? "pm" : "am"}`,
      );
    }

    setAvailableDates(availDates);
    setAvailableTimes(
      availTimes.flatMap((hour) => [hour, hour.replace("00", "30")]),
    );
  }, []);

  useEffect(() => {
    const mFromDate = moment(fromDate);
    setToDate((prev) =>
      moment(prev)
        .year(mFromDate.year())
        .month(mFromDate.month())
        .date(mFromDate.date())
        .toDate(),
    );
  }, [fromDate]);

  return (
    <FullPage screen>
      <Stack
        sx={{ width: "100%", paddingBlock: 4, paddingInline: 8 }}
        spacing={4}
      >
        <PageHeader onGoBack={() => navigate(-1)} text="Add Event" />

        <Stack sx={{ width: "100%" }} spacing={2}>
          <Stack direction={"row"} spacing={2}>
            <TextInput
              required
              label="Title:"
              value={title}
              setValue={setTitle}
            />
            <Stack sx={{ width: "100%" }} />
          </Stack>

          <TextInput
            required
            label="Event Description:"
            value={desc}
            setValue={setDesc}
            multiline
            rows={4}
          />

          <Stack direction={"row"} spacing={2}>
            <RadioInput
              label="All day event"
              checked={fullDay}
              onClick={() => setFullDay((prev) => !prev)}
            />
            <RadioInput
              label="Time scoped event"
              checked={!fullDay}
              onClick={() => setFullDay((prev) => !prev)}
            />
          </Stack>

          {availableDates.length > 0 && (
            <Stack>
              <SelectInput
                required
                label="Event Date:"
                selectedItem={toReadableDate(fromDate, false)}
                items={availableDates.map((date) => ({
                  value: toReadableDate(date, false),
                  text: `${moment(date).format("MMM Do, YYYY")}`,
                }))}
                onSelect={(dateStr) => setFromDate(fromReadableDate(dateStr))}
              />
            </Stack>
          )}
          {!fullDay && availableTimes.length > 0 && (
            <Stack direction={"row"} spacing={2}>
              <SelectInput
                required
                label="From:"
                selectedItem={toTimeString(fromDate)}
                items={availableTimes.map((time) => ({ value: time }))}
                onSelect={(timeStr) =>
                  setFromDate((prev) => fromTimeString(timeStr, prev))
                }
              />
              <SelectInput
                required
                label="To:"
                selectedItem={toTimeString(toDate)}
                items={availableTimes.map((time) => ({ value: time }))}
                onSelect={(timeStr) =>
                  setToDate((prev) => fromTimeString(timeStr, prev))
                }
              />
            </Stack>
          )}
        </Stack>
      </Stack>
    </FullPage>
  );
};
