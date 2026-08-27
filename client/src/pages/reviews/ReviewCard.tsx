import {
  Divider,
  ReadMore,
  StarRow,
  TBody,
  THeading,
  type StarRating,
} from "@/components";
import { CSS } from "@/Constants";
import type { IReview } from "@/interfaces";
import { toLegalDate } from "@/utils";
import { Stack } from "@mui/material";

type ReviewCardProps = {
  review: IReview;
  divider?: boolean;
};

export const ReviewCard = ({ review, divider = false }: ReviewCardProps) => {
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
            <THeading>
              {`${review.person.firstName} ${review.person.lastName}`.trim()}
            </THeading>
            <TBody medium color={CSS.colors.darkGrey}>
              {`${toLegalDate(new Date(review.createdOn))}${review.person.email.length > 0 ? ` - ${review.person.email}` : ""}${review.person.phone.length > 0 ? ` - ${review.person.phone}` : ""}`}
            </TBody>
          </Stack>

          <Stack direction={"row"} spacing={2} sx={{ alignItems: "center" }}>
            <THeading>{review.rating}/5</THeading>
            <StarRow filled={review.rating as StarRating} />
          </Stack>
        </Stack>

        <ReadMore text={review.message} />
      </Stack>

      {divider && <Divider />}
    </Stack>
  );
};
