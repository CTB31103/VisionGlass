import { BasicModal } from "./BasicModal";
import { Link, Stack } from "@mui/material";
import { ActionButton } from "../buttons";

type QuoteRequestSuccessModalProps = {
  open: boolean;
  asap?: boolean;
  href?: string;
  onClose?: () => void;
  onClick?: () => void;
};

export const QuoteRequestSuccessModal = ({
  open,
  asap,
  href,
  onClose,
  onClick,
}: QuoteRequestSuccessModalProps) => {
  return (
    <BasicModal
      shrinkHeight
      title="Success"
      subtitle={`Thank you for reaching out, we got your request and we'll reach back out to you as soon as we can${asap ? "!" : " during the times you stated!"}`}
      centerSubtitle
      open={open}
      onClose={onClose}
    >
      <Stack sx={{ width: "100%", alignItems: "center" }}>
        <Link underline="none" color="inherit" href={href}>
          <ActionButton onClick={onClick} color="red">
            Done
          </ActionButton>
        </Link>
      </Stack>
    </BasicModal>
  );
};
