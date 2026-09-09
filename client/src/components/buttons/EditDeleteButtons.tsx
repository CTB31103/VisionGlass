import { Link, Stack, Tooltip } from "@mui/material";
import { BorderButton } from "./BorderButton";
import { Icons } from "../icons";
import type { PropsWithChildren } from "react";

type EditDeleteButtonsProps = {
  editHref?: string;
  editToolTip?: string;
  redDelete?: boolean;
  onEdit?: React.MouseEventHandler<HTMLButtonElement>;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
};

export const EditDeleteButtons = ({
  editHref,
  editToolTip,
  redDelete,
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
      {onEdit && editHref && (
        <ToolTipOrStack>
          <Link underline="none" color="inherit" href={editHref}>
            <BorderButton onClick={onEdit}>
              <Icons.Edit />
            </BorderButton>
          </Link>
        </ToolTipOrStack>
      )}
      {!onEdit && editHref && (
        <ToolTipOrStack>
          <Link underline="none" color="inherit" href={editHref}>
            <BorderButton>
              <Icons.Edit />
            </BorderButton>
          </Link>
        </ToolTipOrStack>
      )}
      {onEdit && !editHref && (
        <ToolTipOrStack>
          <BorderButton onClick={onEdit}>
            <Icons.Edit />
          </BorderButton>
        </ToolTipOrStack>
      )}
      {onDelete && (
        <BorderButton color={redDelete ? "red" : undefined} onClick={onDelete}>
          <Icons.Delete />
        </BorderButton>
      )}
    </Stack>
  );
};
