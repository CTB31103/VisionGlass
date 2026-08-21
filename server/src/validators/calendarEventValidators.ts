import { ITimeBlock } from "../interfaces";
import { Validator, ValidateFunc, IRules, RULES } from "./validate";

const getEventsValidation = (query: any) => {
  const rules: IRules = {};

  if (query.eventId) {
    rules["eventId"] = RULES.multiple(
      RULES.required,
      RULES.string,
      RULES.min(1),
    );
  }

  if (query.from || query.to) {
    rules["from"] = RULES.multiple(RULES.required, RULES.numeric, RULES.min(1));
    rules["to"] = RULES.multiple(RULES.required, RULES.numeric, RULES.min(1));
  }

  const validator = new Validator(query, rules);
  ValidateFunc(validator);

  let dateRange: { from: number; to: number } | undefined = undefined;
  if (query.from && query.to) {
    dateRange = {
      from: parseInt(query.from),
      to: parseInt(query.to),
    };
  }

  return {
    calendarEventId: (query.eventId || undefined) as string | undefined,
    dateRange,
  };
};

const timeBlockValidation = (body: any) => {
  const rules = {
    to: "required|numeric",
    from: "required|numeric",
  };

  const validator = new Validator(body, rules);
  ValidateFunc(validator);

  return {
    to: body.to as number,
    from: body.from as number,
  } as ITimeBlock;
};

const createEventValidation = (body: any) => {
  const rules = {
    date: "required|numeric|min: 1",
    allDay: "required|boolean",
    title: "required|string|min: 1",
    desc: "required|string|min: 1",
  };

  const validator = new Validator(body, rules);
  ValidateFunc(validator);

  let timeBlock: ITimeBlock | undefined = undefined;

  if (body?.timeBlock) {
    timeBlock = timeBlockValidation(body.timeBlock);
  }

  return {
    date: body.date as number,
    allDay: body.allDay as boolean,
    title: body.title as string,
    desc: body.desc as string,
    timeBlock: timeBlock,
  };
};

const deleteEvent = (params: any) => {
  const rules = {
    calendarEventId: "required|string|min:1",
  };

  const validator = new Validator(params, rules);
  ValidateFunc(validator);

  return {
    calendarEventId: params.calendarEventId as string,
  };
};

export const CalendarEventValidators = {
  getEventsValidation,
  createEventValidation,
  deleteEvent,
};
