import { ActionButton, NoDataFound, THeading } from "@/components";
import { Stack } from "@mui/material";

type CustomerDocumentsProps = {
  documents?: string[];
};

export const CustomerDocuments = ({ documents }: CustomerDocumentsProps) => {
  return (
    <Stack spacing={2} sx={{ pb: 4 }}>
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <THeading>Associated Documents</THeading>

        <ActionButton color="red">Add Document</ActionButton>
      </Stack>

      {[].length === 0 ? (
        <NoDataFound message="No documents associated with customer yet" />
      ) : (
        <Stack
          direction={"row"}
          spacing={4}
          sx={{ pb: 4, overflowX: "scroll" }}
        ></Stack>
      )}
    </Stack>
  );
};
