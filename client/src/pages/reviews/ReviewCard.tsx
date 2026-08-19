import { Divider, ReadMore, StarRow, TBody, THeading } from "@/components";
import { CSS } from "@/Constants";
import { Stack } from "@mui/material";

export const ReviewCard = () => {
  return (
    <Stack spacing={4} sx={{ width: "100%" }}>
      <Stack sx={{ width: "100%" }}>
        <Stack
          direction={"row"}
          sx={{
            width: "100%",
            alignItems: "start",
            justifyContent: "space-between",
          }}
        >
          <Stack>
            <THeading>John Doe</THeading>
            <TBody medium color={CSS.colors.darkGrey}>
              May 8, 2026 - johndoe@gmail.com - 7163469684
            </TBody>
          </Stack>

          <Stack direction={"row"} spacing={2} sx={{ alignItems: "center" }}>
            <THeading>5/5</THeading>
            <StarRow />
          </Stack>
        </Stack>

        <ReadMore text="This is a huge read more comment" />
      </Stack>

      <Divider />
    </Stack>
  );
};
