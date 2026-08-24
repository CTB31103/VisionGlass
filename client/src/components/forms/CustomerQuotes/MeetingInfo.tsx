import { DateSelectInput, RadioInput, TextInput } from "@/components/inputs";
import type { UseCreateCustomerQuoteServiceResponse } from "@/hooks";
import { Stack } from "@mui/material";

type MeetingInfoProps = {
  state: UseCreateCustomerQuoteServiceResponse["meetingInfo"];
};

export const MeetingInfo = ({
  state: {
    readyToSchedule,
    setReadyToSchedule,
    meetingTime,
    setMeetingTime,
    endMeetingTime,
    setEndMeetingTime,
    carAddress,
    setCarAddress,
  },
}: MeetingInfoProps) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <RadioInput
        label="Ready to schedule:"
        boxLabel="Ready to schedule service"
        checked={readyToSchedule}
        onClick={() => setReadyToSchedule((prev) => !prev)}
      />

      {readyToSchedule && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <TextInput
            required
            label="Car Location:"
            value={carAddress}
            setValue={setCarAddress}
          />
          <DateSelectInput
            label="Service appointment date:"
            date={meetingTime}
            setDate={setMeetingTime}
            start={{
              label: `Service appointment start time:`,
              value: meetingTime,
              set: setMeetingTime,
            }}
            end={{
              label: "Service appointment end time:",
              value: endMeetingTime,
              set: setEndMeetingTime,
            }}
            halfHour
          />
        </Stack>
      )}
    </Stack>
  );
};
