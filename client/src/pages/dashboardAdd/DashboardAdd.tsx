import {
  ActionButton,
  BasicModal,
  FullPage,
  ModalCloseCenterButton,
  PageHeader,
  RadioInput,
  SelectInput,
  TBody,
  TextInput,
} from "@/components";
import { ROUTES } from "@/Constants";
import { useApi, useRouteDateParam, useScreenSize } from "@/hooks";
import {
  fromReadableDate,
  fromTimeString,
  toMidnight,
  toNearestHalfHour,
  toReadableDate,
  toTimeString,
} from "@/utils";
import { RULES, validation } from "@/validation";
import { Stack } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type IData = {
  date: number;
  allDay: boolean;
  title: string;
  desc: string;
  timeBlock:
    | {
        from: number;
        to: number;
      }
    | undefined;
};

export const DashboardAdd = () => {
  const navigate = useNavigate();

  const {
    snackbar: [_, errorSnack],
    calendarEventRoutes: { createCalendarEvent },
  } = useApi();

  const { lessThanEqualTo } = useScreenSize();

  const [loading, setLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [fullDay, setFullDay] = useState(false);
  const [fromDate, setFromDate] = useState(toNearestHalfHour(new Date()));
  const [toDate, setToDate] = useState(toNearestHalfHour(new Date()));
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const [urlDate, setUrlDate] = useState<Date | undefined>(undefined);

  useRouteDateParam((paramDate) => {
    if (paramDate.getTime() < toMidnight(new Date()).getTime()) return;
    setFromDate(toNearestHalfHour(paramDate));
    setUrlDate(paramDate);
  });

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

  const isValid = (data: IData) => {
    const [_, errorMsg1] = validation<Omit<IData, "timeBlock">>(
      {
        allDay: [RULES.common.requiredBool, "full day"],
        date: [RULES.common.requiredNumber, ""],
        desc: [RULES.common.requiredString, "description"],
        title: [RULES.common.requiredString, ""],
      },
      data,
    );
    let errMsg2;

    if (data.timeBlock) {
      const [__, errorMsg2] = validation<
        Exclude<IData["timeBlock"], undefined>
      >(
        {
          from: [RULES.common.requiredNumber, ""],
          to: [RULES.common.requiredNumber, ""],
        },
        data.timeBlock,
      );
      errMsg2 = errorMsg2;
    }

    if (errorMsg1 || errMsg2) {
      errorSnack(errorMsg1 || errMsg2 || null);
      return false;
    }

    return true;
  };

  const submit = async () => {
    setLoading(true);
    const data = {
      date: toMidnight(moment(fromDate)).getTime(),
      allDay: fullDay,
      title,
      desc,
      timeBlock: fullDay
        ? undefined
        : {
            from: fromDate.getTime(),
            to: toDate.getTime(),
          },
    };

    if (!isValid(data)) return setLoading(false);

    const res = await createCalendarEvent(data);
    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    setSuccessModalOpen(true);
  };

  const onCloseModal = () => (
    setSuccessModalOpen(false),
    navigate(
      ROUTES.DASHBOARD + `${urlDate ? `?date=${urlDate.getTime()}` : ``}`,
    )
  );

  return (
    <FullPage>
      <Stack
        sx={{
          width: "100%",
          paddingBlock: lessThanEqualTo.md ? 6 : 4,
          paddingInline: lessThanEqualTo.xs ? 2 : 8,
          pb: lessThanEqualTo.md ? 2 : undefined,
        }}
        spacing={lessThanEqualTo.xs ? 4 : 4}
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
            {!lessThanEqualTo.md && <Stack sx={{ width: "100%" }} />}
          </Stack>

          <TextInput
            required
            label="Event Description:"
            value={desc}
            setValue={setDesc}
            multiline
            rows={4}
          />

          <Stack direction={lessThanEqualTo.xs ? "column" : "row"} spacing={2}>
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

        <Stack sx={{ width: "100%", alignItems: "center" }}>
          <ActionButton loading={loading} onClick={submit} color="red">
            Add to dashboard
          </ActionButton>
        </Stack>

        <BasicModal
          title={"Success"}
          subtitle={"Event added to the system!"}
          open={successModalOpen}
          onClose={onCloseModal}
        >
          <Stack
            sx={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack>
              <TBody medium>Title: {title}</TBody>
              <TBody medium>
                Date:{" "}
                {`${toReadableDate(fromDate, true)}${fullDay ? ` - Full Day Event` : ` - ${toTimeString(toDate)}`}`}
              </TBody>
              <TBody medium trunk={2}>
                Description: {desc}
              </TBody>
            </Stack>
          </Stack>
          <ModalCloseCenterButton onClick={onCloseModal} />
        </BasicModal>
      </Stack>
    </FullPage>
  );
};
