import { ITimeBlock } from "./timeBlock";

export const SYSTEM_EVENTS = {
  NEW_CUST: "system_new_customer",
  SALES_NEW_CUST: "system_sales_new_customer",
  SCHED_CUST: "system_scheduled_customer",
  DONE_CUST: "system_customer_done",
};

export interface ICalendarEvent {
  calendarEventId: string;
  creatorId: string;
  date: number;
  allDay: boolean;
  timeBlock?: ITimeBlock;
  title: string;
  desc: string;
  eventType: string;
}
