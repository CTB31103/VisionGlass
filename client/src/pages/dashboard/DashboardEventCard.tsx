import { Divider, ReadMore, TBody, THeading } from "@/components";
import { EditDeleteButtons } from "@/components/buttons/EditDeleteButtons";
import { SYSTEM_EVENTS_ARRAY, type ICalendarEvent } from "@/interfaces";
import { Chip, Stack } from "@mui/material";
import moment from "moment";

type DashboardEventCardProps = {
  calendarEvent: ICalendarEvent;

  isSystemEvent?: boolean;

  divider?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

const TIME_FORMAT_STR = "h:mm a";

export const DashboardEventCard = ({
  calendarEvent,
  divider,
  onEdit,
  onDelete,
}: DashboardEventCardProps) => {
  const mStartDate = calendarEvent.timeBlock?.from
    ? moment(calendarEvent.timeBlock?.from)
    : undefined;
  const mDate = moment(calendarEvent.date);
  const mEndDate = calendarEvent.timeBlock?.to
    ? moment(calendarEvent.timeBlock?.to)
    : undefined;

  const isSystemEvent = SYSTEM_EVENTS_ARRAY.includes(calendarEvent.eventType);

  const formattedStartEndDate = mStartDate
    ? `, ${mStartDate.format(TIME_FORMAT_STR)}${mEndDate ? ` - ${mEndDate.format(TIME_FORMAT_STR)}` : ``}`
    : "";
  const formattedDateTime = isSystemEvent
    ? `, ${mDate.format(TIME_FORMAT_STR)}`
    : "";
  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stack sx={{ width: "100%" }} spacing={1}>
        <Stack
          direction={"row"}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Stack>
            <THeading bold>{calendarEvent.title}</THeading>
            <Stack direction={"row"} spacing={1}>
              {isSystemEvent && (
                <Chip variant="outlined" size="small" label="System Event" />
              )}
              {calendarEvent.allDay && (
                <Chip variant="outlined" size="small" label="All Day" />
              )}
              <TBody>
                {`${mDate.format("MMM Do")}${mStartDate ? formattedStartEndDate : formattedDateTime}`}
              </TBody>
            </Stack>
          </Stack>

          {(onEdit || onDelete) && !isSystemEvent && (
            <EditDeleteButtons onEdit={onEdit} onDelete={onDelete} redDelete />
          )}
        </Stack>

        <ReadMore text={calendarEvent.desc.replaceAll("\n", "<br/>")} />
      </Stack>

      {divider && <Divider />}
    </Stack>
  );
};
