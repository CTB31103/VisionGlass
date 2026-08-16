import { IMAGES } from "@/assets";
import {
  ActionButton,
  FullPage,
  HeroImageWithForm,
  THeading,
} from "@/components";
import { Link, Stack } from "@mui/material";
import { ROUTES } from "@/Constants";
import { ShopLocations } from "./ShopLocations";
import { MobileServiceAreas } from "./MobileServiceAreas";
import { ContactForm } from "./ContactForm";
import { useScreenSize } from "@/hooks";

export const Contact = () => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();

  return (
    <FullPage screen>
      <HeroImageWithForm src={IMAGES.BluePhone}>
        <Stack sx={{ pl: sizeUnder.sm ? 0 : 8 }} spacing={4}>
          <Stack>
            <THeading bungee large align="center">
              Ready to Repair?
            </THeading>
            <THeading bungee thin align="center">
              Contact Us Today for Fast, Reliable Service
            </THeading>
          </Stack>
          <Stack sx={{ alignItems: "center" }}>
            <Link href={ROUTES.TELEPHONE}>
              <ActionButton color="red">Call Now (716) 336-7222</ActionButton>
            </Link>
          </Stack>
        </Stack>
      </HeroImageWithForm>

      <ShopLocations />

      <MobileServiceAreas />

      <ContactForm />
    </FullPage>
  );
};
