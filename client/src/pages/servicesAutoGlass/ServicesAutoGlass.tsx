import { IMAGES } from "@/assets";
import {
  ActionButton,
  FullPage,
  HeroImage,
  OtherServicesSections,
  TextImageRowColumns,
  THeading,
  WhenToReplaceSection,
} from "@/components";
import { ROUTES } from "@/Constants";
import { useScreenSize } from "@/hooks";
import { Link, Stack } from "@mui/material";

export const ServicesAutoGlass = () => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();

  return (
    <FullPage screen>
      <HeroImage src={IMAGES.AutoGlassReplace}>
        <Stack
          sx={{
            paddingInline: sizeUnder.xs ? 2 : 8,
            maxWidth: sizeUnder.xs ? "100%" : "75%",
          }}
          spacing={4}
        >
          <Stack>
            <THeading large bungee>
              Auto Glass Replacement Solutions
            </THeading>
            <THeading bungee thin>
              Expert Repair and Replacement for all your Auto Glass Needs
            </THeading>
          </Stack>
          <Stack direction={"row"}>
            <Link href={ROUTES.QUOTES}>
              <ActionButton color="red">Quote me now</ActionButton>
            </Link>
          </Stack>
        </Stack>
      </HeroImage>

      <TextImageRowColumns
        header={"Side or Rear Window Damage?"}
        body={[
          {
            innerHtml: `Don't let damage to your side or rear windows compromise your vehicle's safety. At Vision Glass, we understand the importance of authenticity and quality. That's why we only use genuine <span style="font-weight: bold">OEM glass</span> in our repairs, ensuring a perfect fit and flawless finish that meets or exceeds manufacturer specifications. We work with original equipment parts to replicate your vehicle's exact standards, so you can trust that any replacement windows will be installed correctly and function as they should.`,
          },
        ]}
        btn={{
          text: `Get quoted today`,
          href: ROUTES.QUOTES,
        }}
        imageSrc={IMAGES.ServiceAG}
        reverse={sizeUnder.sm}
      />

      <WhenToReplaceSection />

      <Stack sx={{ pt: 8 }}>
        <OtherServicesSections WR ADAS CC />
      </Stack>
    </FullPage>
  );
};
