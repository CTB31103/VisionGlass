import { LargePictureWithCardSection } from "./LargePictureWithCardSection";
import { Link, Stack } from "@mui/material";
import { ActionButton, BorderButton } from "../buttons";
import { NumberedItem, TBody, THeading } from "../typography";
import { ROUTES } from "@/Constants";
import { IMAGES } from "@/assets";

export const WhenToReplaceSection = () => {
  const whenToReplace = [
    "Cracks that are over 6 inches long (these can compromise the glass's durability and increase the risk of further damage)",
    "There are more than 3 chips.",
    "Significant clouding or staining on the glass (this can be a sign of wear and tear or aging)",
    "Uneven or distorted glass (this can affect your visibility and driving experience)",
  ];

  return (
    <LargePictureWithCardSection imageSrc={IMAGES.WindshieldReplacement}>
      <THeading>When to replace your windshield</THeading>

      <Stack spacing={2}>
        {whenToReplace.map((item, i) => (
          <NumberedItem number={i + 1} text={item} />
        ))}
      </Stack>
      <Stack direction={"row"} spacing={4}>
        <Link href={ROUTES.QUOTES}>
          <ActionButton color="red">Quote & Schedule</ActionButton>
        </Link>

        <Link href={ROUTES.TELEPHONE}>
          <BorderButton color="blue">
            <TBody medium bold>
              Or Call (716) 336-7222
            </TBody>
          </BorderButton>
        </Link>
      </Stack>
    </LargePictureWithCardSection>
  );
};
