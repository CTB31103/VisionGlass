import { IMAGES } from "@/assets";
import {
  ActionButton,
  BackgroundShape,
  TextInput,
  THeading,
} from "@/components";
import { CONSTANTS, CSS } from "@/Constants";
import { Stack } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

export const ContactForm = () => {
  return (
    <Stack
      direction={"row"}
      sx={{ paddingInline: 8, paddingBlock: 16 }}
      spacing={8}
    >
      <Stack
        sx={{
          // width: "100%",
          // minHeight: "80%",
          width: "100%",
          position: "relative",
          flex: 0.6,

          pr: 8,

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          style={{
            width: "75%",
            height: "75%",
            objectFit: "cover",
            borderTopLeftRadius: 50,
            borderBottomRightRadius: 50,
            zIndex: 1,
            pointerEvents: "none",
          }}
          src={IMAGES.CoolCarFront}
          alt="Camaro Auto Glass"
        />
        <BackgroundShape>
          <Stack sx={{ width: "75%", height: "75%", pr: 8 }}>
            <Stack
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: CSS.colors.grey,
                borderTopLeftRadius: 50,
                borderBottomRightRadius: 50,
              }}
            ></Stack>
          </Stack>
        </BackgroundShape>
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
