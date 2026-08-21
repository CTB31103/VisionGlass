import { Router } from "express";
import Controllers from "../controllers";

export const CalendarEventRoutes = Router();

CalendarEventRoutes.get("/", Controllers.CalendarEventController.getEvents);

CalendarEventRoutes.post("/", Controllers.CalendarEventController.createEvent);

CalendarEventRoutes.delete(
  "/:calendarEventId",
  Controllers.CalendarEventController.deleteEvent,
);
