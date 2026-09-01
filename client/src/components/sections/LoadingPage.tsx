import { FullPage } from "../layout";
import { Stack } from "@mui/material";
import { Spinner } from "@chakra-ui/react";

export const LoadingPage = () => {
  return (
    <FullPage>
      <Stack
        sx={{
          width: "100%",
          minHeight: "80vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spinner size={"xl"} />
      </Stack>
    </FullPage>
  );
};
