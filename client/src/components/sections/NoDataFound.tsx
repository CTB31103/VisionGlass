import { Stack } from "@mui/material";
import { TBody } from "../typography";
import { Spinner } from "@chakra-ui/react";
import { CSS } from "@/Constants";

type NoDataFoundProps = {
  loading?: boolean;
  message?: string;
};

export const NoDataFound = ({
  loading,
  message = "No results could be found.",
}: NoDataFoundProps) => {
  if (loading)
    return (
      <Stack sx={{ width: "100%", alignItems: "center", paddingBlock: 4 }}>
        <Spinner size={"xl"} color={CSS.colors.black} />
      </Stack>
    );

  return (
    <Stack sx={{ width: "100%", alignItems: "center", pt: 8 }}>
      <TBody>{message}</TBody>
    </Stack>
  );
};
