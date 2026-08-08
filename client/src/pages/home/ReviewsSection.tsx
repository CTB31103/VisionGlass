import { IMAGES } from "@/assets";
import { THeading, TBody, PastReviews } from "@/components";
import { CSS } from "@/Constants";
import { Stack } from "@mui/material";

export const ReviewsSection = () => {
  return (
    <Stack sx={{ minHeight: "70vh", paddingBlock: 8, paddingInline: 16 }}>
      <Stack
        className="text-white"
        sx={{
          bgcolor: CSS.colors.blue,
          borderTopLeftRadius: 20,
          borderBottomRightRadius: 20,
          padding: 4,
        }}
        spacing={4}
      >
        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
          }}
        >
          <THeading thin bungee align="center">
            What do past customers think?
          </THeading>
          <Stack sx={{ paddingInline: 4 }}>
            <TBody align="center">
              At Vision Glass, we're dedicated to not only fixing your broken
              glass, but also putting a smile back on your face. Our customers'
              satisfaction is our top priority, and we strive to exceed
              expectations with every repair, replacement, or maintenance
              service - because when it comes to your car, we know that you
              can't afford to settle for anything less.
            </TBody>
          </Stack>
          <img
            style={{ height: 200 }}
            src={IMAGES.Google5SMedal}
            alt="Google: 5 Star Reviews"
          />
        </Stack>

        <PastReviews />
      </Stack>
    </Stack>
  );
};
