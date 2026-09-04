import moment, { type Moment } from "moment";

type MDate = Moment | Date;

export const toMidnight = (date: MDate = new Date()) =>
  moment(date).hours(0).minutes(0).seconds(0).millisecond(0).toDate();

export const toReadableDate = (
  date: MDate = new Date(),
  includeTime: boolean = true,
) => moment(date).format(`MM/DD/YY${includeTime ? " hh:mm a" : ""}`);

export const toLegalDate = (date: MDate = new Date()) =>
  moment(date).format("MMM D, YYYY");

export const toReadableDateYY = (
  date: MDate = new Date(),
  includeTime: boolean = true,
) => moment(date).format(`MM/DD/YYYY${includeTime ? " hh:mm a" : ""}`);

export const toTimeString = (date: MDate = new Date(), leadingZero = true) =>
  moment(date).format(`${leadingZero ? "h" : ""}h:mm a`);

export const fromReadableDate = (dateStr: string, longYear: boolean = false) =>
  moment(dateStr, `MM/DD/YY${longYear ? "YY" : ""}`, true).toDate();

export const fromTimeString = (
  timeStr: string,
  date: MDate = new Date(),
  leadingZero = true,
) => {
  const timeDate = moment(timeStr, `${leadingZero ? "h" : ""}h:mm a`);
  const mDate = moment(date);

  const combined = moment(mDate)
    .hours(timeDate.hours())
    .minutes(timeDate.minutes())
    .seconds(0)
    .milliseconds(0);

  return combined.toDate();
};

export const isValidReadableDate = (
  dateStr: string,
  longYear: boolean = false,
) => moment(dateStr, `MM/DD/YY${longYear ? "YY" : ""}`, true).isValid();

export const toNearestHalfHour = (date: MDate) => {
  const mDate = moment(date);
  const minute = mDate.minutes();

  if (minute > 45) mDate.hours(mDate.hour() + 1);

  if (minute >= 15 && minute <= 45) mDate.minutes(30);
  else mDate.minutes(0);

  return mDate.toDate();
};

export const toNearestHour = (date: MDate) => {
  const mDate = moment(date);
  const minute = mDate.minutes();

  if (minute >= 30) mDate.hour(mDate.hour() + 1);

  mDate.minutes(0);

  return mDate.toDate();
};
