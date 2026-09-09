import queryString from "query-string";
import { useAuthFetch, useHttpSignal } from "../http";
import type { ICalendarEvent } from "@/interfaces";

export const useCalendarEventApi = () => {
  const { get, post, del } = useAuthFetch();
  const { getNewSignal, abortSignal } = useHttpSignal();

  const getAllCalendarEvents = async () => {
    return await get<{ calendarEvents: ICalendarEvent[] }>(
      `/api/calendar-events/`,
    );
  };

  const getCalendarEventsBtwn = async (data: { from: number; to: number }) => {
    return await get<{ calendarEvents: ICalendarEvent[] }>(
      `/api/calendar-events?${queryString.stringify(data)}`,
    );
  };

  const deleteCalendarEvent = async (calendarEventId: string) => {
    return await del<{ deleted: boolean }>(
      `/api/calendar-events/${calendarEventId}`,
    );
  };

  const createCalendarEvent = async (
    data: Omit<
      Omit<
        Omit<Omit<ICalendarEvent, "calendarEventId">, "creatorId">,
        "visibleUserIds"
      >,
      "eventType"
    >,
  ) => {
    return await post<{ calendarEvent: ICalendarEvent }>(
      `/api/calendar-events/`,
      data,
      {
        signal: getNewSignal("createCalendarEvent"),
      },
    );
  };

  return {
    getAllCalendarEvents,
    createCalendarEvent,
    getCalendarEventsBtwn,
    deleteCalendarEvent,

    abortSignal,
  };
};
