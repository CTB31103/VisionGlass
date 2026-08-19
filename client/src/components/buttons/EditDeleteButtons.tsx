import { Stack } from "@mui/material";
import { BorderButton } from "./BorderButton";
import { Icons } from "../icons";

type EditDeleteButtonsProps = {
  onEdit?: () => void;
  onDelete?: () => void;
};

export const EditDeleteButtons = ({
  onEdit,
  onDelete,
}: EditDeleteButtonsProps) => {
  return (
    <Stack direction={"row"} spacing={2}>
      {onEdit && (
        <BorderButton onClick={onEdit}>
          <Icons.Edit />
        </BorderButton>
      )}
      {onDelete && (
        <BorderButton onClick={onDelete}>
          <Icons.Delete />
        </BorderButton>
      )}
    </Stack>
  );
};
