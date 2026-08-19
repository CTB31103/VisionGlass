import { IMAGES } from "@/assets";
import {
  ActionButton,
  SquareImageShape,
  TextInput,
  THeading,
} from "@/components";
import { CONSTANTS, CSS } from "@/Constants";
import { useScreenSize } from "@/hooks";
import { Stack } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

export const ContactForm = () => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  return (
    <Stack
      direction={sizeUnder.md ? "column" : "row"}
      sx={{
        paddingInline: sizeUnder.md ? 4 : 8,
        paddingBlock: sizeUnder.md ? 12 : 16,
      }}
      spacing={8}
    >
      <Stack
        sx={{
          flex: sizeUnder.md ? undefined : 0.6,
          width: sizeUnder.md ? "100%" : undefined,

          alignItems: sizeUnder.md ? "center" : "start",
          justifyContent: "center",
        }}
      >
        <Stack
          sx={{
            width: sizeUnder.xxs ? "100%" : sizeUnder.xs ? "90%" : "75%",
            pr: sizeUnder.xs ? 2 : 0,
          }}
        >
          <SquareImageShape
            heightMult={sizeUnder.md ? 0.5 : 1}
            imageSrc={IMAGES.CoolCarFront}
            alt="Camaro Auto Glass"
          />
        </Stack>
      </Stack>

      <Stack sx={{ flex: 0.4, alignItems: "center" }} spacing={4}>
        <THeading bold align="center">
          Leave us a message
        </THeading>

        <Stack
          spacing={2}
          sx={{
            width: "100%",
            alignItems: "end",
            pb: sizeUnder.xs ? 1 : 0,
          }}
        >
          <TextInput label="Name" value="" setValue={() => {}} />
          <TextInput label="Email" value="" setValue={() => {}} />
          <TextInput
            label="Phone"
            placeholder="(xxx) xxx-xxxx"
            value=""
            setValue={() => {}}
          />
          <TextInput
            label="Message"
            multiline
            rows={5}
            value=""
            setValue={() => {}}
          />
          <Stack
            sx={
              sizeUnder.md
                ? {
                    transform: `scale(0.9) translateX(${sizeUnder.xxs ? 15 : 10}%)`,
                    transformOrigin: "0 0",

                    borderWidth: 1,
                    borderColor: CSS.colors.black,
                    pb: 1,
                    pr: 1,
                  }
                : {}
            }
          >
            <ReCAPTCHA
              size="normal"
              sitekey={CONSTANTS.api.recaptcha()}
              onChange={(value: unknown) => {
                console.log(value);
              }}
            />
          </Stack>
        </Stack>

        <Stack sx={{ alignItems: "end", width: "100%" }}>
          <ActionButton color="red">Send</ActionButton>
        </Stack>
      </Stack>
    </Stack>
  );
};
