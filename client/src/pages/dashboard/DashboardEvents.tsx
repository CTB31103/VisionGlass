import {
  ActionButton,
  Icons,
  PaginationControl,
  TBody,
  THeading,
} from "@/components";
import { Link, Stack } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { DashboardEventCard } from "./DashboardEventCard";
import { DEFAULT_PAGINATION_LIMIT_OPTIONS, ROUTES } from "@/Constants";
import { type ICalendarEvent } from "@/interfaces";
import { Spinner } from "@chakra-ui/react";
import { useIsAdminService, useScreenSize } from "@/hooks";
import { useUserStore } from "@/stores";

import { usePagination } from "react-use-pagination";
import { toMidnight } from "@/utils";

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
  const { lessThanEqualTo } = useScreenSize();
  const isAdmin = useIsAdminService();
  const user = useUserStore((state) => state.user);

  const [mDate, setMDate] = useState(moment(date));

  useEffect(() => {
    setMDate(moment(date));
  }, [date.getTime()]);

  const href = ROUTES.DASHBOARD_ADD + `?date=${date.getTime()}`;

  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    pageSize,
    nextEnabled,
    previousEnabled,
    setPageSize,
    setNextPage,
    setPreviousPage,
    setPage,
  } = usePagination({
    totalItems: daysEvents.length,
    initialPage: 0,
    initialPageSize: DEFAULT_PAGINATION_LIMIT_OPTIONS[0],
  });

  useEffect(() => {
    setPage(0);
  }, []);

  return (
    <Stack spacing={4}>
      <Stack
        direction={lessThanEqualTo.xs ? "column" : "row"}
        sx={{
          width: "100%",
          alignItems: "end",
          justifyContent: "space-between",
        }}
      >
        <Stack
          sx={{ width: lessThanEqualTo.xs ? "100%" : undefined }}
          spacing={-2}
        >
          <THeading large bungeeFill>
            Events
          </THeading>

          <TBody bold>{mDate.format("MM/DD/YY")}</TBody>
        </Stack>

        {date.getTime() >= toMidnight(new Date()).getTime() && (
          <Link href={href}>
            <ActionButton color="red">
              Add Event <Icons.Add />
            </ActionButton>
          </Link>
        )}
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
          daysEvents.slice(startIndex, endIndex + 1).map((dE, i, arr) => {
            const canAlter = isAdmin || dE.creatorId === user.userId;
            return (
              <DashboardEventCard
                key={dE.calendarEventId}
                calendarEvent={dE}
                divider={i !== arr.length - 1}
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

      <PaginationControl
        page={currentPage + 1}
        totalCount={daysEvents.length}
        pageLimit={{
          value: pageSize,
          set: setPageSize,
          available: DEFAULT_PAGINATION_LIMIT_OPTIONS,
        }}
        totalPage={totalPages}
        onNextPage={nextEnabled ? setNextPage : undefined}
        onPrevPage={previousEnabled ? setPreviousPage : undefined}
      />
    </Stack>
  );
};
