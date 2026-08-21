import { ICalendarEvent, UserType } from "../interfaces";
import { CalendarEvent, CalendarEventModel } from "../models";
import { HashUtils, Log, TryCatch } from "../utils";
import Validators from "../validators";
import ControllerFunc from "./controllerFunc";

const getEvents = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const { calendarEventId, dateRange } =
        Validators.CalendarEventValidators.getEventsValidation(req.query);

      let mongoQuery = {
        $or: [],
      };

      if (calendarEventId) {
        (mongoQuery["$or"] as unknown[]).push({
          calendarEventId: { $in: calendarEventId.split(",") },
        });
      }

      if (dateRange) {
        (mongoQuery["$or"] as unknown[]).push({
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

      const calendarEvents = (await CalendarEventModel.find(mongoQuery)).map(
        (calEvent) => calEvent.toCalendarEvent(),
      );

      res.send({ calendarEvents });
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
        visibleUserIds: [],
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
