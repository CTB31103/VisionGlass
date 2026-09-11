import { usePastReviews, useScreenSize } from "@/hooks";
import { TBody, THeading } from "../typography";
import { StarRow } from "./StarRow";
import { CSS } from "@/Constants";
import { Stack } from "@mui/material";
import { PlayButtons } from "../buttons";

export const PastReviews = () => {
  const { review, onNext, onPrev } = usePastReviews();
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  return (
    <Stack
      sx={{
        bgcolor: CSS.colors.white,
        borderRadius: 5,
        color: CSS.colors.black,
        padding: sizeUnder.xs ? 2 : 3,
        paddingBlock: sizeUnder.xxs ? 2 : undefined,
      }}
    >
      <Stack
        // direction={"row"}
        sx={{ alignItems: sizeUnder.xs ? "center" : "start" }}
        spacing={2}
      >
        {/* {!sizeUnder.xs && (
          <IconButton onClick={onPrev}>
            <Icons.ChevronLeft />
          </IconButton>
        )} */}

        <Stack sx={{ flex: 1 }} spacing={1}>
          <THeading>{review.name}</THeading>
          <StarRow filled={review.stars} />
          <TBody>{review.desc}</TBody>
        </Stack>

        <PlayButtons onNext={onNext} onPrev={onPrev} />

        {/* {!sizeUnder.xs && (
          <IconButton onClick={onNext}>
            <Icons.ChevronRight />
          </IconButton>
        )} */}
      </Stack>
    </Stack>
  );
};
