import { IMAGES } from "@/assets";
import {
  ActionButton,
  SquareImageShape,
  TextInput,
  THeading,
} from "@/components";
import { CONSTANTS } from "@/Constants";
import { Stack } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

export const ContactForm = () => {
  return (
    <Stack
      direction={"row"}
      sx={{ paddingInline: 8, paddingBlock: 16 }}
      spacing={8}
    >
      <Stack sx={{ flex: 0.6 }}>
        <SquareImageShape
          imageSrc={IMAGES.CoolCarFront}
          alt="Camaro Auto Glass"
        />
      </Stack>

      <Stack sx={{ flex: 0.4, alignItems: "center" }} spacing={4}>
        <THeading bold align="center">
          Leave us a message
        </THeading>

        <Stack spacing={2} sx={{ width: "100%", alignItems: "end" }}>
          <TextInput label="Name" value="" setValue={() => {}} />
          <TextInput label="Email" value="" setValue={() => {}} />
          <TextInput label="Phone" value="" setValue={() => {}} />
          <TextInput
            label="Message"
            multiline
            rows={5}
            value=""
            setValue={() => {}}
          />
          <ReCAPTCHA
            sitekey={CONSTANTS.api.recaptcha()}
            onChange={(value: unknown) => {
              console.log(value);
            }}
          />
        </Stack>

        <Stack sx={{ alignItems: "end", width: "100%" }}>
          <ActionButton color="red">Send</ActionButton>
        </Stack>
      </Stack>
    </Stack>
  );
};
