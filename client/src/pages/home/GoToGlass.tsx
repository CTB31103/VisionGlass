import { IMAGES } from "@/assets";
import { TBody, THeading } from "@/components";
import { Stack } from "@mui/material";

export const GoToGlass = () => {
  return (
    <Stack direction={"row"} sx={{}}>
      <Stack
        sx={{
          width: "50%",
          alignItems: "center",
          paddingInline: 8,
          paddingBlock: 16,
        }}
        spacing={1}
      >
        <THeading align="center">Your Go to Glass Shop</THeading>
        <TBody align="center">
          Welcome to Vision Glass, where we're dedicated to helping you see
          clearly - inside and out.{" "}
          <span style={{ fontWeight: "bold" }}>
            We use only Genuine OEM (Original Equipment Manufacturer)
          </span>{" "}
          glass that matches the{" "}
          <span style={{ fontWeight: "bold" }}>exact</span> design and logo of
          your vehicle's original windshield. With{" "}
          <span style={{ fontWeight: "bold" }}>
            over 30 years of experience
          </span>{" "}
          and a team of{" "}
          <span style={{ fontWeight: "bold" }}>expert installers</span>, you can
          trust us to get the job done right. Whether it's a cracked windshield,
          a shattered side window, or a faulty ADAS system,{" "}
          <span style={{ fontWeight: "bold" }}>
            we'll meet you at your car with our mobile service
          </span>
          , so you don't have to take a break from your busy life. Say goodbye
          to cloudy visibility and hello to a stress-free driving experience
          with <span style={{ fontWeight: "bold" }}>Vision Glass</span>!
          <br />
          <br />
          We know how frustrating it can be when your car's glass is damaged -
          whether it's a cracked windshield, shattered side window, or faulty
          ADAS system. We're committed to getting you back on the road quickly
          and safely. We understand that{" "}
          <span style={{ fontWeight: "bold" }}>
            safety, quality, and accessibility
          </span>
          are top priorities for our customers, which is why we offer our mobile
          service to meet you at your car with our team of expert technicians -
          so you can get back to where you need to go without delay. At{" "}
          <span style={{ fontWeight: "bold" }}>Vision Glass</span>, we're
          dedicated to putting{" "}
          <span style={{ fontWeight: "bold" }}>your needs first</span>, so you
          can drive with confidence again.
        </TBody>
      </Stack>

      <Stack
        sx={{
          position: "relative",
          width: "50%",
        }}
      >
        <Stack
          sx={{
            position: "absolute",
            top: 0,
            right: "-30%",
            width: "70vw",
            height: "100%",

            alignItems: "end",
            justifyContent: "center",
          }}
        >
          <img
            style={{ width: "100%" }}
            src={IMAGES.Jeep}
            alt="Jeep Cherokee"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
