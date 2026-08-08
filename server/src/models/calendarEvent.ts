import { Prop, PropType } from "@typegoose/typegoose";
import { ICalendarEvent, ITimeBlock } from "../interfaces";
import { Log } from "../utils";
import { TimeBlock } from "./timeBlock";

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
  timeBlock: ITimeBlock;
  @Prop({ type: String })
  title: string;
  @Prop({ type: String })
  desc: string;
  @Prop({ type: () => [String] }, PropType.ARRAY)
  visibleUserIds: string[];

  constructor({
    calendarEventId,
    creatorId,
    date,
    allDay,
    timeBlock,
    title,
    desc,
    visibleUserIds,
  }: ICalendarEvent) {
    this.calendarEventId = calendarEventId;
    this.creatorId = creatorId;
    this.date = date;
    this.allDay = allDay;
    this.timeBlock = timeBlock;
    this.title = title;
    this.desc = desc;
    this.visibleUserIds = visibleUserIds;
  }

  toCalendarEvent() {
    return new CalendarEvent(this);
  }

  toString() {
    return Log.json(this);
  }
}
