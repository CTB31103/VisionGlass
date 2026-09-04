import {
  getModelForClass,
  mongoose,
  Prop,
  PropType,
  ReturnModelType,
} from "@typegoose/typegoose";
import { ICalendarEvent, ITimeBlock } from "../interfaces";
import { Log } from "../utils";
import { TimeBlock } from "./timeBlock";
import { CustomerQuote } from "./customerQuote";
import { MongoDoc } from "./mongoDoc";

export class CalendarEvent implements ICalendarEvent {
  @Prop({ type: String })
  calendarEventId: string;
  @Prop({ type: String })
  creatorId: string;
  @Prop({ type: Number })
  date: number;
  @Prop({ type: Boolean })
  allDay: boolean;
  @Prop({ type: TimeBlock, _id: false })
  timeBlock?: ITimeBlock;
  @Prop({ type: String })
  title: string;
  @Prop({ type: String })
  desc: string;
  @Prop({ type: String })
  eventType: string;

  constructor({
    calendarEventId,
    creatorId,
    date,
    allDay,
    timeBlock,
    title,
    desc,
    eventType,
  }: ICalendarEvent) {
    this.calendarEventId = calendarEventId;
    this.creatorId = creatorId;
    this.date = date;
    this.allDay = allDay;
    this.timeBlock = timeBlock;
    this.title = title;
    this.desc = desc;
    this.eventType = eventType;
  }

  toCalendarEvent() {
    return new CalendarEvent(this);
  }

  toString() {
    return Log.json(this);
  }
}

type CalendarEventModel = ReturnModelType<typeof CalendarEvent> &
  Pick<mongoose.PaginateModel<MongoDoc<CalendarEvent>>, "paginate">;

export const CalendarEventModel = getModelForClass(
  CalendarEvent,
) as CalendarEventModel;
