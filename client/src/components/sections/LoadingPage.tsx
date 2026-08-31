import { FullPage } from "../layout";
import { Stack } from "@mui/material";
import { Spinner } from "@chakra-ui/react";

export const LoadingPage = () => {
  return (
    <FullPage screen>
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spinner size={"xl"} />
      </Stack>
    </FullPage>
  );
};
