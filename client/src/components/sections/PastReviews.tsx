import { usePastReviews } from "@/hooks";
import { Icons } from "../icons";
import { TBody, THeading } from "../typography";
import { StarRow } from "./StarRow";
import { CSS } from "@/Constants";
import { IconButton, Stack } from "@mui/material";

export const PastReviews = () => {
  const { review, onNext, onPrev } = usePastReviews();
  return (
    <Stack
      sx={{
        bgcolor: CSS.colors.white,
        borderRadius: 5,
        color: CSS.colors.black,
        padding: 3,
      }}
    >
      <Stack
        direction={"row"}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Stack
          spacing={2}
          direction={"row"}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <IconButton onClick={onPrev}>
            <Icons.ChevronLeft />
          </IconButton>

          <Stack spacing={1}>
            <THeading>{review.name}</THeading>
            <StarRow filled={review.stars} />
            <TBody>{review.desc}</TBody>
          </Stack>
        </Stack>

        <IconButton onClick={onNext}>
          <Icons.ChevronRight />
        </IconButton>
      </Stack>
    </Stack>
  );
};
