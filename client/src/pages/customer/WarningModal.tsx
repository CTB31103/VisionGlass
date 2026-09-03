import {
  ActionButton,
  BasicModal,
  BorderButton,
  Icons,
  TEXT_SIZES,
  type IconType,
} from "@/components";
import { Link, Stack } from "@mui/material";

type WarningModalProps = {
  open: boolean;
  subtitle: string;

  href?: string;

  updateText?: string;
  UpdateIcon?: IconType;

  onClose?: () => void;
  onUpdate?: () => void;
};

export const WarningModal = ({
  open,
  subtitle,
  href,
  updateText = "Update",
  UpdateIcon = Icons.Edit,
  onClose,
  onUpdate,
}: WarningModalProps) => {
  return (
    <BasicModal
      centerSubtitle
      open={open}
      shrinkHeight
      title="Warning"
      subtitle={subtitle}
    >
      <Stack
        direction={"row"}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: 4,
        }}
      >
        <BorderButton color="blue" onClick={onClose}>
          <Icons.Close sx={{ fontSize: TEXT_SIZES.medium2 }} />
          Close
        </BorderButton>
        <Link underline="none" color="inherit" href={href}>
          <ActionButton
            color="red"
            onClick={onUpdate}
            EndIcon={<UpdateIcon sx={{ fontSize: TEXT_SIZES.medium2 }} />}
          >
            {updateText}
          </ActionButton>
        </Link>
      </Stack>
    </BasicModal>
  );
};
