import { LargePictureWithCardSection } from "./LargePictureWithCardSection";
import { Link, Stack } from "@mui/material";
import { ActionButton, BorderButton } from "../buttons";
import { NumberedItem, TBody, THeading } from "../typography";
import { ROUTES } from "@/Constants";
import { IMAGES } from "@/assets";
import { useScreenSize } from "@/hooks";

export const WhenToReplaceSection = () => {
  const { lessThanEqualTo: sizeUnder, exact } = useScreenSize();

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
          <NumberedItem key={i} number={i + 1} text={item} />
        ))}
      </Stack>
      <Stack
        direction={sizeUnder.md ? "column" : "row"}
        spacing={sizeUnder.md ? 2 : 4}
        sx={{ width: "100%" }}
      >
        <Link href={ROUTES.QUOTES}>
          <ActionButton
            fullWidth={sizeUnder.md}
            lg={exact.lg || sizeUnder.xxs}
            color="red"
          >
            Quote & Schedule
          </ActionButton>
        </Link>

        <Link href={ROUTES.TELEPHONE}>
          <BorderButton
            fullWidth={sizeUnder.md}
            lg={exact.lg || sizeUnder.xxs}
            color="blue"
          >
            <TBody medium bold>
              Or Call (716) 336-7222
            </TBody>
          </BorderButton>
        </Link>
      </Stack>
    </LargePictureWithCardSection>
  );
};
