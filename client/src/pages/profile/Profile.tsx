import { FullPage, PageHeader } from "@/components";
import { Stack } from "@mui/material";

export const Profile = () => {
  return (
    <FullPage screen>
      <Stack
        sx={{ width: "100%", paddingBlock: 4, paddingInline: 8 }}
        spacing={4}
      >
        <PageHeader text="User Profile" />
      </Stack>
    </FullPage>
  );
};
