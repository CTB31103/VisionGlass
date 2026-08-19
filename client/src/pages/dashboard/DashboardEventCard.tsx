import { ReadMore, TBody, THeading } from "@/components";
import { EditDeleteButtons } from "@/components/buttons/EditDeleteButtons";
import { Chip, Stack } from "@mui/material";
import moment from "moment";

type DashboardEventCardProps = {
  title: string;
  desc: string;

  startDate: Date;
  endDate?: Date;

  onEdit?: () => void;
  onDelete?: () => void;
};

export const DashboardEventCard = ({
  title,
  desc,
  startDate,
  endDate,
  onEdit,
  onDelete,
}: DashboardEventCardProps) => {
  const mStartDate = moment(startDate);
  const mEndDate = endDate ? moment(endDate) : undefined;
  return (
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
              {`${mStartDate.format("MMM Do, H:mm a")}${mEndDate ? ` - ${mEndDate.format("H:mm a")}` : ""}`}
            </TBody>
          </Stack>
        </Stack>

        {(onEdit || onDelete) && (
          <EditDeleteButtons onEdit={onEdit} onDelete={onDelete} />
        )}
      </Stack>

      <ReadMore text={desc} />
    </Stack>
  );
};
