import {
  ICalendarEvent,
  ICustomerQuote,
  ITimeBlock,
  IUser,
  SYSTEM_EVENTS,
} from "../interfaces";
import {
  CalendarEvent,
  CalendarEventModel,
  CustomerQuote,
  MongoDoc,
  User,
} from "../models";
import { HashUtils } from "./hashUtils";
import { ISession } from "./sessionFunc";

const createNewCustomerMessage = async (
  session: ISession,
  customerQuote: ICustomerQuote,
  settings?: { title?: string; desc?: string; date?: number; allDay?: boolean },
  isSales?: boolean,
) => {
  const dashboardMessage: ICalendarEvent = {
    calendarEventId: HashUtils.uniqueId(),
    creatorId: customerQuote.customerQuoteId,
    eventType: isSales ? SYSTEM_EVENTS.SALES_NEW_CUST : SYSTEM_EVENTS.NEW_CUST,

    date: settings?.date ?? new Date().getTime(),

    allDay: settings?.allDay ?? false,
    title: settings?.title ?? `New Customer`,
    desc:
      settings?.desc ??
      `New customer ${isSales ? `created by team member.` : `requested a quote.`} ${new CustomerQuote(customerQuote).fullName()} is ready to be quoted.`,
  };

  const message = (
    await CalendarEventModel.create([dashboardMessage], { session })
  )[0] as MongoDoc<CalendarEvent>;

  return message;
};

const createScheduledMessage = async (
  session: ISession,
  scheduledBy: string,
  customer: ICustomerQuote,
  settings?: {
    title?: string;
    desc?: string;
    date?: number;
    timeBlock?: ITimeBlock;
    allDay?: boolean;
  },
) => {
  const fullName = new CustomerQuote(customer).fullName();
  const carInfo = customer.car
    ? `\nCar: ${customer.car.year} ${customer.car.make} ${customer.car.model}`
    : "";
  const carLocation = customer.address
    ? `\nCar Location: ${customer.address}`
    : "";

  const dashboardMessage: ICalendarEvent = {
    calendarEventId: HashUtils.uniqueId(),
    creatorId: scheduledBy,
    date: settings?.date ?? new Date().getTime(),

    allDay: settings?.allDay ?? false,
    title: settings?.title ?? `Appointment Scheduled`,
    desc:
      settings?.desc ??
      `${fullName} has been scheduled for an appointment today.${carInfo}${carLocation}`,

    timeBlock: settings?.timeBlock,

    eventType: SYSTEM_EVENTS.SCHED_CUST,
  };

  const message = (
    await CalendarEventModel.create([dashboardMessage], { session })
  )[0];

  return message;
};

const createDoneMessage = async (
  session: ISession,
  user: IUser,
  customer: ICustomerQuote,
  settings?: {
    title?: string;
    desc?: string;
    date?: number;
    timeBlock?: ITimeBlock;
    allDay?: boolean;
  },
) => {
  const userFullName = new User(user).fullName();
  const customerFullName = new CustomerQuote(customer).fullName();

  const dashboardMessage: ICalendarEvent = {
    calendarEventId: HashUtils.uniqueId(),
    creatorId: user.userId,
    date: settings?.date ?? new Date().getTime(),

    allDay: settings?.allDay ?? false,
    title: settings?.title ?? `Appointment Completed`,
    desc:
      settings?.desc ??
      `${userFullName} marked customer ${customerFullName} appointment as done.`,

    timeBlock: settings?.timeBlock,

    eventType: SYSTEM_EVENTS.DONE_CUST,
  };

  const message = (
    await CalendarEventModel.create([dashboardMessage], { session })
  )[0];

  return message;
};

export const CalendarEventUtils = {
  createNewCustomerMessage,
  createScheduledMessage,
  createDoneMessage,
};
