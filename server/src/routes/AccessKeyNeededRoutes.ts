import { Router } from "express";
import Middleware from "../middleware";
import CalendarEventRoutes from "./calendarEventRoutes";
import ChatRoutes from "./chatRoutes";
import CustomerQuoteRoutes from "./customerQuoteRoutes";
import UserStatisticRoutes from "./userStatisticRoutes";

const AccessKeyNeededRoutes = Router();

AccessKeyNeededRoutes.use(Middleware.accessKeyOnly);

AccessKeyNeededRoutes.use("/user-stats", UserStatisticRoutes); // User Statistics related endpoints
AccessKeyNeededRoutes.use("/customer-quotes", CustomerQuoteRoutes); // Customer Quotes related endpoints
AccessKeyNeededRoutes.use("/calendar-events", CalendarEventRoutes); // Calendar Events related endpoints
AccessKeyNeededRoutes.use("/chats", ChatRoutes); // Chat related endpoints

export default AccessKeyNeededRoutes;
