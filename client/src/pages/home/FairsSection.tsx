import { IMAGES } from "@/assets";
import { ActionButton, TBody, THeading } from "@/components";
import { CSS, ROUTES } from "@/Constants";
import { useScreenSize } from "@/hooks";
import { Box, Link, Stack } from "@mui/material";

export const FairsSection = () => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  return (
    <Stack
      sx={{
        position: "relative",

        p: sizeUnder.xxs ? 4 : sizeUnder.sm ? 4 : sizeUnder.md ? 8 : 16,

        backgroundImage: `url(${IMAGES.Carnival})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",

        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          bgcolor: CSS.colors.blue,
          opacity: 0.25,
        }}
      />

      <Stack
        sx={{
          p: sizeUnder.xs ? 2.5 : 5,
          bgcolor: CSS.colors.white,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
        spacing={2}
      >
        <THeading align="center">Catch Us at a Fair Near You!</THeading>

        <Stack spacing={1}>
          <TBody align="center">
            At Vision Glass, we love showing off our products and services in
            person. You might catch us at your favorite fair, convention, car
            show, or pop-up event - where we'll be handing out free quotes and
            information about our mobile auto glass repair service.
          </TBody>

          <TBody align="center">
            We're always on the move, so keep an eye on our website for updates
            on upcoming events and locations. We're excited to bring our
            expertise to a location near you soon!
          </TBody>
        </Stack>

        <Link href={ROUTES.FAIRS} underline="none" sx={{ outline: "none" }}>
          <ActionButton autoHeight={sizeUnder.xxs} color="red">
            See where we'll be next!
          </ActionButton>
        </Link>
      </Stack>
    </Stack>
  );
};
