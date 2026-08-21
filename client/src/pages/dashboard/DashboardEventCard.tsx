import { Divider, ReadMore, TBody, THeading } from "@/components";
import { EditDeleteButtons } from "@/components/buttons/EditDeleteButtons";
import { Chip, Stack } from "@mui/material";
import moment from "moment";

type DashboardEventCardProps = {
  title: string;
  desc: string;

  date: Date;

  startDate?: Date;
  endDate?: Date;
  divider?: boolean;

  onEdit?: () => void;
  onDelete?: () => void;
};

export const DashboardEventCard = ({
  title,
  desc,
  date,
  startDate,
  endDate,
  divider,
  onEdit,
  onDelete,
}: DashboardEventCardProps) => {
  const mStartDate = moment(startDate);
  const mDate = moment(date);
  const mEndDate = endDate ? moment(endDate) : undefined;
  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stack sx={{ width: "100%" }} spacing={1}>
        <Stack
          direction={"row"}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Stack>
            <THeading bold>{title}</THeading>
            <Stack direction={"row"} spacing={1}>
              {!mEndDate && (
                <Chip variant="outlined" size="small" label="All Day" />
              )}
              <TBody>
                {`${mDate.format("MMM Do")}${mStartDate ? `, ${mStartDate.format("H:mm a")}${mEndDate ? ` - ${mEndDate.format("H:mm a")}` : ""}` : ``}`}
              </TBody>
            </Stack>
          </Stack>

          {(onEdit || onDelete) && (
            <EditDeleteButtons onEdit={onEdit} onDelete={onDelete} />
          )}
        </Stack>

        <ReadMore text={desc} />
      </Stack>

      {divider && <Divider />}
    </Stack>
  );
};
