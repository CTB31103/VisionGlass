import { Divider, FullPage, PageHeader } from "@/components";
import { Stack } from "@mui/material";
import { DashboardCalendar } from "./DashboardCalendar";
import { DashboardEvents } from "./DashboardEvents";
import { useState } from "react";
import { toMidnight } from "@/utils";

export const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(toMidnight(new Date()));

  return (
    <FullPage screen>
      <Stack
        sx={{ width: "100%", paddingBlock: 4, paddingInline: 8 }}
        spacing={4}
      >
        <PageHeader text="Dashboard" />

        <DashboardCalendar date={selectedDate} setDate={setSelectedDate} />

        <Divider />

        <DashboardEvents date={selectedDate} />
      </Stack>
    </FullPage>
  );
};
