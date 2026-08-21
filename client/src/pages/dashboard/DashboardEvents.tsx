import { ActionButton, Icons, TBody, THeading } from "@/components";
import { Link, Stack } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { DashboardEventCard } from "./DashboardEventCard";
import { ROUTES } from "@/Constants";
import type { ICalendarEvent } from "@/interfaces";
import { Spinner } from "@chakra-ui/react";
import { useIsAdminService } from "@/hooks";
import { useUserStore } from "@/stores";

type DashboardEventsProps = {
  date: Date;
  daysEvents: ICalendarEvent[];

  loading?: boolean;
  onDeleteBtn?: (calendarEventId: string) => void;
};

export const DashboardEvents = ({
  date,
  loading,
  daysEvents,
  onDeleteBtn,
}: DashboardEventsProps) => {
  const isAdmin = useIsAdminService();
  const user = useUserStore((state) => state.user);

  const [mDate, setMDate] = useState(moment(date));

  useEffect(() => {
    setMDate(moment(date));
  }, [date.getTime()]);

  const href = ROUTES.DASHBOARD_ADD + `?date=${date.getTime()}`;

  return (
    <Stack spacing={4}>
      <Stack
        direction={"row"}
        sx={{
          width: "100%",
          alignItems: "end",
          justifyContent: "space-between",
        }}
      >
        <Stack spacing={-2}>
          <THeading large bungeeFill>
            Events
          </THeading>

          <TBody bold>{mDate.format("MM/DD/YY")}</TBody>
        </Stack>

        <Link href={href}>
          <ActionButton color="red">
            Add Event <Icons.Add />
          </ActionButton>
        </Link>
      </Stack>

      <Stack sx={{ width: "100%" }} spacing={4}>
        {loading || daysEvents.length === 0 ? (
          <Stack
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            spacing={2}
          >
            {loading ? (
              <Spinner size="xl" />
            ) : (
              <Stack
                spacing={2}
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                <TBody>There are no events scheduled for today</TBody>
                <Link href={href}>
                  <ActionButton color="red">
                    Add Event <Icons.Add />
                  </ActionButton>
                </Link>
              </Stack>
            )}
          </Stack>
        ) : (
          daysEvents.map((dE, i, arr) => {
            const canAlter = isAdmin || dE.creatorId === user.userId;
            return (
              <DashboardEventCard
                key={dE.calendarEventId}
                title={dE.title}
                desc={dE.desc}
                date={new Date(dE.date)}
                startDate={
                  dE.timeBlock?.from ? new Date(dE.timeBlock?.from) : undefined
                }
                endDate={
                  dE.timeBlock?.to ? new Date(dE.timeBlock.to) : undefined
                }
                divider={i !== arr.length - 1}
                onEdit={() => {}}
                onDelete={
                  canAlter && onDeleteBtn
                    ? () => onDeleteBtn(dE.calendarEventId)
                    : undefined
                }
              />
            );
          })
        )}
      </Stack>
    </Stack>
  );
};
