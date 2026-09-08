import { ICalendarEvent, UserType } from "../interfaces";
import { CalendarEventModel, RootFilterQuery } from "../models";
import { HashUtils, TryCatch } from "../utils";
import Validators from "../validators";
import ControllerFunc from "./controllerFunc";

const getEvents = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const { calendarEventId, dateRange } =
        Validators.CalendarEventValidators.getEventsValidation(req.query);

      let mongoQuery: RootFilterQuery<ICalendarEvent> = {
        $and: [],
      };

      if (calendarEventId) {
        mongoQuery.$and!.push({
          calendarEventId: { $in: calendarEventId.split(",") },
        });
      }

      if (dateRange) {
        mongoQuery.$and!.push({
          $and: [
            {
              date: { $gte: dateRange.from },
            },
            {
              date: { $lte: dateRange.to },
            },
          ],
        });
      }

      const calendarEvents = await CalendarEventModel.find(mongoQuery).sort({
        allDay: -1,
        date: -1,
      });

      res.send({
        calendarEvents: calendarEvents.map((calEvent) =>
          calEvent.toCalendarEvent(),
        ),
      });
    },
    (err) => {
      res.status(500).json({ error: err });
    },
  ),
);

const createEvent = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const { userId: creatorId } =
        Validators.TokenValidators.resLocalsTokenValues(res.locals);
      const { date, allDay, title, desc, timeBlock } =
        Validators.CalendarEventValidators.createEventValidation(req.body);

      const calEvent: ICalendarEvent = {
        calendarEventId: HashUtils.uniqueId(),
        creatorId,
        date,
        allDay,
        timeBlock,
        title,
        desc,
        eventType: "other", // TODO: allow user to select type
      };

      const calendarEvent = (
        await CalendarEventModel.create([calEvent], {})
      )[0].toCalendarEvent();

      res.send({ calendarEvent });
    },
    (err) => {
      res.status(500).json({ error: err });
    },
  ),
);

const deleteEvent = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const { userId, role } = Validators.TokenValidators.resLocalsTokenValues(
        res.locals,
      );
      const { calendarEventId } =
        Validators.CalendarEventValidators.deleteEvent(req.params);

      const exists = await CalendarEventModel.findOne({ calendarEventId });

      if (!exists)
        throw new Error(`Event ${calendarEventId} could not be found.`);

      if (role !== UserType.ADMIN && exists.creatorId !== userId)
        throw new Error(`Account unauthorized to complete action.`);

      await CalendarEventModel.deleteOne({ calendarEventId });

      res.send({ deleted: true });
    },
    (err) => {
      res.status(500).json({ error: err });
    },
  ),
);

export const CalendarEventController = {
  getEvents,
  createEvent,
  deleteEvent,
};
