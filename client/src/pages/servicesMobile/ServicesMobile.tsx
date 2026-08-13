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
import { Link, Stack } from "@mui/material";

export const ServicesMobile = () => {
  return (
    <FullPage screen>
      <HeroImage src={IMAGES.Service_MB_Rect}>
        <Stack sx={{ paddingInline: 8, maxWidth: "66%" }} spacing={4}>
          <Stack>
            <THeading large bungee>
              On The Go Installation
            </THeading>
            <THeading bungee thin>
              Convenient mobile installation services - we come to you
            </THeading>
          </Stack>

          <Stack>
            <Link href={ROUTES.QUOTES}>
              <ActionButton color="red">Lets get started</ActionButton>
            </Link>
          </Stack>
        </Stack>
      </HeroImage>

      <TextImageRowColumns
        header="Expert Mobile Glass Installations"
        body={[
          `At Vision Glass, our mobile installation services allow us to bring the highest level of expertise and professionalism right to your doorstep. Our experienced technicians are trained to provide fast, efficient, and reliable auto glass repair and replacement solutions - wherever you are.`,
          `With years of combined experience in the auto glass industry, our team is equipped with the latest technology and techniques to ensure a perfect fit every time. From residential to commercial vehicles, we've seen it all - and know how to handle even the most complex installations on the go. By choosing us for your mobile installation needs, you can trust that your vehicle's safety features will be restored with precision and care, giving you peace of mind on the road.`,
        ]}
        imageSrc={IMAGES.WindshieldReplacement}
      />

      <WhenToReplaceSection />

      <Stack sx={{ pt: 8 }}>
        <OtherServicesSections ADAS AG WR />
      </Stack>
    </FullPage>
  );
};

/*

Help me create a section for a auto glass repair companies website, this section will be on a page listing details on one of their services, this page's service is 'Mobile Installation' lean into proffesional exper technicians. Write this section as if you are convincing the customer to choose this company to do the work for them. Create a title and a paragraph or two to go with the title

*/
