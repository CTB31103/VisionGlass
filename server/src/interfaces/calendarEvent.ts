import { ITimeBlock } from "./timeBlock";

export enum Visibility {
  PERSONAL = "personal",
  SELECT = "select",
  ALL = "all",
}

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
