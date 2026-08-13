import { IMAGES } from "@/assets";
import {
  ActionButton,
  CheckmarkItem,
  FullPage,
  HeroImage,
  LargePictureWithCardSection,
  OtherServicesSections,
  TBody,
  TextImageRowColumns,
  THeading,
} from "@/components";
import { ROUTES } from "@/Constants";
import { Link, Stack } from "@mui/material";

export const ServicesCrackChip = () => {
  const whenCanRepairs = [
    `Your damage is smaller than a quarter`,
    `The crack has not started to grow, or 'spider'`,
    `There are 3 or less chips`,
  ];
  return (
    <FullPage screen>
      <HeroImage src={IMAGES.Chip2}>
        <Stack sx={{ paddingInline: 8, maxWidth: "75%" }} spacing={4}>
          <Stack>
            <THeading large bungee>
              Crack & Chip Repair
            </THeading>
            <THeading bungee thin>
              Quick and affordable fixes for small glass damage
            </THeading>
          </Stack>
          <Stack>
            <Link href={ROUTES.QUOTES}>
              <ActionButton color="red">Lets get it fixed</ActionButton>
            </Link>
          </Stack>
        </Stack>
      </HeroImage>

      <TextImageRowColumns
        header="The Right Choice: Crack & Chip Repair"
        body={[
          `At Vision Glass, we understand that not all cracks and chips in your windshield or auto glass surfaces are 
deal-breakers. In fact, many can be fixed quickly and affordably using advanced repair techniques. That's why we 
recommend our crack and chip repair service over replacement whenever possible.`,
          `By choosing our repair service, you're not only saving money, but also reducing the environmental impact of 
disposing of a replaced windshield or auto glass component. Our technicians use state-of-the-art equipment and 
expert techniques to fill cracks and chips with a specialized resin that's almost indistinguishable from the 
original glass. Not only will your vehicle look like new again, but you'll also be protecting the environment and 
avoiding unnecessary waste.`,
        ]}
        imageSrc={IMAGES.Chip3}
        btn={{
          text: `Schedule Today`,
          href: ROUTES.QUOTES,
        }}
      />

      <LargePictureWithCardSection small reverse imageSrc={IMAGES.Repair1}>
        <Stack sx={{ alignItems: "start" }} spacing={2}>
          <THeading>Can my windshield be repaired?</THeading>
          <TBody>
            Not all cracks and chips in your windshield require replacement -
            some can be fixed with advanced repair techniques that leave the
            glass looking like new. Our experienced technicians will assess your
            windshield's condition and determine if a repair is possible, saving
            you money and hassle.
          </TBody>
        </Stack>

        <Stack spacing={2} sx={{ width: "100%" }}>
          {whenCanRepairs.map((repair, i) => (
            <CheckmarkItem key={i} text={repair} />
          ))}
        </Stack>
      </LargePictureWithCardSection>

      <Stack sx={{ pt: 12 }}>
        <OtherServicesSections AG ADAS WR />
      </Stack>
    </FullPage>
  );
};
