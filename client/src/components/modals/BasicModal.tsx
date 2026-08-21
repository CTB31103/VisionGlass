import { Modal, Paper, Stack } from "@mui/material";
import { type PropsWithChildren } from "react";
import { TBody, THeading } from "../typography";
import { CSS } from "@/Constants";

type BasicModalProps = {
  open: boolean;
  onClose?: () => void;

  title: string;
  subtitle?: string;
  shrink?: boolean;
};

export const BasicModal = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  shrink,
}: PropsWithChildren<BasicModalProps>) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            width: shrink ? "40vw" : "60vw",
            height: shrink ? undefined : "70vh",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: CSS.colors.black,
          }}
          elevation={4}
        >
          <Stack sx={{ width: "100%", height: "100%", p: 4 }} spacing={2}>
            <Stack sx={{ width: "100%", alignItems: "center" }}>
              <THeading bungeeFill>{title}</THeading>
              <TBody>{subtitle}</TBody>
            </Stack>

            {children}
          </Stack>
        </Paper>
      </Stack>
    </Modal>
  );
};
