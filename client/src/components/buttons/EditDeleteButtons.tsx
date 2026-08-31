import { Link, Stack } from "@mui/material";
import { BorderButton } from "./BorderButton";
import { Icons } from "../icons";

type EditDeleteButtonsProps = {
  editHref?: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const EditDeleteButtons = ({
  editHref,
  onEdit,
  onDelete,
}: EditDeleteButtonsProps) => {
  return (
    <Stack direction={"row"} spacing={2}>
      {(onEdit || editHref) && (
        <Link underline="none" color="inherit" href={editHref}>
          <BorderButton onClick={onEdit}>
            <Icons.Edit />
          </BorderButton>
        </Link>
      )}
      {onDelete && (
        <BorderButton onClick={onDelete}>
          <Icons.Delete />
        </BorderButton>
      )}
    </Stack>
  );
};
