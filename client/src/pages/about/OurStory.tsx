import { IMAGES } from "@/assets";
import {
  BackgroundShape,
  SlantedImageShape,
  TBody,
  THeading,
} from "@/components";
import { Stack } from "@mui/material";

export const OurStory = () => {
  return (
    <Stack
      direction={"row"}
      sx={{
        paddingInline: 8,
      }}
      spacing={8}
    >
      <Stack
        sx={{
          flex: 1,
          alignItems: "center",
          paddingBlock: 16,
        }}
        spacing={2}
      >
        <THeading>Our Story</THeading>
        <TBody align="center">
          In 1997, a group of friends from Western New York came together to
          start a small business that would change the way people experienced
          auto glass repair and replacement. We began by setting up kiosks in
          malls across the area, where we offered windshield washing, tire
          changing, and minor repairs like replacing wiper blades for customers
          on-the-go. As our reputation grew, so did our reach, as we expanded to
          mobile gas stations and even converted parking lots into makeshift
          offices using old Kodak photo booth equipment.
        </TBody>

        <TBody align="center">
          Fast forward several years, and our business evolved to meet the
          changing needs of our customers. We simplified the process by
          streamlining our workflow, working directly with insurance companies
          to verify claims and handle paperwork, and offering a convenient
          mobile unit service that comes right to your doorstep or office.
          Today, we're proud to offer a lifetime warranty on our workmanship and
          glass defects, as well as ADAS calibration services all in one place.
          We've come a long way since those early days of working out of kiosks,
          but our commitment to friendly service, quality craftsmanship, and
          convenience has remained at the heart of everything we do.
        </TBody>
      </Stack>

      <SlantedImageShape
        imageSrc={IMAGES.SlantedCrackedWindshield}
        alt="Vision Glass Pop Up Stand"
      />

      {/* <Stack
        sx={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack
          sx={{
            width: "90%",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{ zIndex: 1, pointerEvents: "none" }}
            src={IMAGES.SlantedVGStand}
            
          />

          <BackgroundShape>
            <img src={IMAGES.SlantedShape} alt="Background-Shader" />
          </BackgroundShape>
        </Stack>
      </Stack> */}
    </Stack>
  );
};
