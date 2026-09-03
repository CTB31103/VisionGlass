import { Link, Stack, Tooltip } from "@mui/material";
import { BorderButton } from "./BorderButton";
import { Icons } from "../icons";
import type { PropsWithChildren } from "react";

type EditDeleteButtonsProps = {
  editHref?: string;
  editToolTip?: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const EditDeleteButtons = ({
  editHref,
  editToolTip,
  onEdit,
  onDelete,
}: EditDeleteButtonsProps) => {
  const ToolTipOrStack = ({ children }: PropsWithChildren) =>
    editToolTip ? (
      <Tooltip title={editToolTip}>
        <Stack>{children}</Stack>
      </Tooltip>
    ) : (
      <Stack>{children}</Stack>
    );

  return (
    <Stack direction={"row"} spacing={2}>
      {(onEdit || editHref) && (
        <ToolTipOrStack>
          <Link underline="none" color="inherit" href={editHref}>
            <BorderButton onClick={onEdit}>
              <Icons.Edit />
            </BorderButton>
          </Link>
        </ToolTipOrStack>
      )}
      {onDelete && (
        <BorderButton onClick={onDelete}>
          <Icons.Delete />
        </BorderButton>
      )}
    </Stack>
  );
};
