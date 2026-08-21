import { Stack } from "@mui/material";
import { ActionButton } from "./ActionButton";

type ModalCloseCenterButtonProps = {
  onClick: () => void;
};

export const ModalCloseCenterButton = ({
  onClick,
}: ModalCloseCenterButtonProps) => {
  return (
    <Stack
      sx={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActionButton onClick={onClick} color="red">
        Close
      </ActionButton>
    </Stack>
  );
};
