import { ActionButton, Icons, TBody, THeading } from "@/components";
import { Link, Stack } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { DashboardEventCard } from "./DashboardEventCard";
import { ROUTES } from "@/Constants";

type DashboardEventsProps = {
  date: Date;
};

export const DashboardEvents = ({ date }: DashboardEventsProps) => {
  const [mDate, setMDate] = useState(moment(date));

  useEffect(() => {
    setMDate(moment(date));
  }, [date.getTime()]);

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

        <Link href={ROUTES.DASHBOARD_ADD}>
          <ActionButton color="red">
            Add Event <Icons.Add />
          </ActionButton>
        </Link>
      </Stack>

      <Stack sx={{ width: "100%" }}>
        <DashboardEventCard
          title="Install Appointment"
          desc="This is a desc"
          startDate={date}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      </Stack>
    </Stack>
  );
};
