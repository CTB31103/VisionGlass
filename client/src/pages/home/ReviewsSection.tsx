import { IMAGES } from "@/assets";
import { THeading, TBody, PastReviews } from "@/components";
import { CSS } from "@/Constants";
import { useScreenSize } from "@/hooks";
import { Stack } from "@mui/material";

export const ReviewsSection = () => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  return (
    <Stack
      sx={{
        paddingInline: sizeUnder.xs ? 2 : sizeUnder.md ? 4 : 8,
        paddingBlock: sizeUnder.xs ? 4 : sizeUnder.md ? 8 : 16,
      }}
    >
      <Stack
        className="text-white"
        sx={{
          bgcolor: CSS.colors.blue,
          borderTopLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <Stack
          sx={{
            p: sizeUnder.xs ? 2 : 4,
            pb: sizeUnder.xs ? 1 : 2,
          }}
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
            <Stack sx={{ paddingInline: sizeUnder.xs ? 0 : 4 }}>
              <TBody align="center">
                At Vision Glass, we're dedicated to not only fixing your broken
                glass, but also putting a smile back on your face. Our
                customers' satisfaction is our top priority, and we strive to
                exceed expectations with every repair, replacement, or
                maintenance service - because when it comes to your car, we know
                that you can't afford to settle for anything less.
              </TBody>
            </Stack>
            <img
              style={{ height: sizeUnder.xxs ? 150 : 200 }}
              src={IMAGES.Google5SMedal}
              alt="Google: 5 Star Reviews"
            />
          </Stack>
        </Stack>

        <Stack
          sx={{
            p: sizeUnder.xs ? 2 : 4,
            pt: sizeUnder.xs ? 1 : 2,
          }}
        >
          <PastReviews />
        </Stack>
      </Stack>
    </Stack>
  );
};
