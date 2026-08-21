import type { ITimeBlock } from "./timeBlock";

export const Visibility = {
  PERSONAL: "personal",
  SELECT: "select",
  ALL: "all",
} as const;

export type Visibility = (typeof Visibility)[keyof typeof Visibility];

export interface ICalendarEvent {
  calendarEventId: string;
  creatorId: string;
  date: number;
  allDay: boolean;
  timeBlock?: ITimeBlock;
  title: string;
  desc: string;
  visibleUserIds: string[];
}
