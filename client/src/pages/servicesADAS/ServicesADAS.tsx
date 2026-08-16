import { IMAGES } from "@/assets";
import {
  ActionButton,
  FullPage,
  HeroImage,
  Icons,
  LargePictureWithCardSection,
  NumberedItem,
  OtherServicesSections,
  TBody,
  TEXT_SIZES,
  TextImageRowColumns,
  THeading,
} from "@/components";
import { ROUTES } from "@/Constants";
import { useScreenSize } from "@/hooks";
import { Link, Stack } from "@mui/material";

export const ServicesADAS = () => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();

  const typesOfADAS = [
    {
      title: `Lane Keep Assist (LKA)`,
      desc: `Notifies the driver with a sound and/or vibration if the vehicle is shifting lanes without signal.`,
      iconUrl: IMAGES.IconsCarLaneKeep,
      alt: "Lane Keep Assist (LKA)",
    },
    {
      title: `Lane Departure Warning (LDW)`,
      desc: `Notifies the driver with a sound and/or vibration if the vehicle is shifting lanes without signal.`,
      iconUrl: IMAGES.IconsCarLaneDeparture,
      alt: "Lane Departure Warning (LDW)",
    },
    {
      title: `Forward Collision-avoidance Assist (FCA)`,
      desc: `Detects the distance between the driver’s vehicle and the vehicle in front and notifies the driver by visual and/or audio signal if they are following too close.`,
      iconUrl: IMAGES.IconsCarCollisionAvoid,
      alt: "Forward Collision-avoidance Assist (FCA)",
    },
    {
      title: `Collision Mitigation Braking System (CMBS)`,
      desc: `Similar to the FCA, this system applies the brakes if the driver does not do so after receiving the warning of being too close to the vehicle in front of them.`,
      iconUrl: IMAGES.IconsCarCollisionBraking,
      alt: "Collision Mitigation Braking System (CMBS)",
    },
    {
      title: `Adaptive Cruise Control (ACC)`,
      desc: `Automatically adjusts speed to keep a safe distance between the driver's vehicle and the one ahead.`,
      iconUrl: IMAGES.IconsCarCruise,
      alt: "Adaptive Cruise Control (ACC)",
    },
  ];

  return (
    <FullPage screen>
      <HeroImage src={IMAGES.ADAS1}>
        <Stack sx={{ paddingInline: sizeUnder.xs ? 2 : 8 }} spacing={4}>
          <Stack>
            <THeading large bungee>
              ADAS Windshield Camera Calibration
            </THeading>
            <THeading bungee thin>
              Calibration done right - By Experts you can Trust
            </THeading>
          </Stack>
          <Stack direction={"row"}>
            <Link href={ROUTES.QUOTES}>
              <ActionButton color="red">Lets get started</ActionButton>
            </Link>
          </Stack>
        </Stack>
      </HeroImage>

      <TextImageRowColumns
        header="What is ADAS?"
        body={[
          {
            innerHtml: `<span style="font-weight: bold;">Advanced Driver Assistance Systems (ADAS)</span> are designed to enhance your driving experience 
with features like <span style="font-weight: bold;">lane departure warning</span>, <span style="font-weight: bold;">blind spot detection</span>, and <span style="font-weight: bold;">adaptive cruise control</span>. They rely on sophisticated camera systems to enhance your driving experience. 
But over time, these cameras can become misaligned or calibrated incorrectly, leading to false warnings, reduced 
effectiveness, and even safety risks on the road.`,
          },
          `Our expert technicians use state-of-the-art equipment and rigorous testing procedures to calibrate your ADAS 
camera system with precision. We verify that all cameras are aligned correctly, that software is up-to-date, and 
that the system is functioning within its recommended parameters. By entrusting us with this critical task, you 
can enjoy peace of mind on the road and minimize the risk of accidents caused by faulty calibration.`,
        ]}
        imageSrc={IMAGES.ADAS2}
        reverse={sizeUnder.md}
        translateX={sizeUnder.xs ? 5 : 0}
      />

      <LargePictureWithCardSection imageSrc={IMAGES.WindshieldReplacement}>
        <THeading>Types of ADAS</THeading>

        <Stack spacing={2}>
          {typesOfADAS.map((adasType, i) => (
            <NumberedItem
              key={i}
              Icon={
                <Stack sx={{ position: "relative" }}>
                  <Icons.Checkmark
                    sx={{ opacity: 0, fontSize: TEXT_SIZES.small }}
                  />

                  <Stack
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: `translate(-50%, -50%)`,
                      width: "200%",
                      height: "200%",
                    }}
                  >
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={adasType.iconUrl}
                      alt={adasType.alt}
                    />
                  </Stack>
                </Stack>
              }
              number={1}
            >
              <Stack>
                <TBody bold>{adasType.title}</TBody>
                <TBody>{adasType.desc}</TBody>
              </Stack>
            </NumberedItem>
          ))}
        </Stack>
      </LargePictureWithCardSection>

      <TextImageRowColumns
        header="Dynamic vs Static: ADAS Calibration"
        body={[
          `As you consider repairing or replacing your windshield, it's essential to understand how Advanced Driver Assistance Systems (ADAS) calibration works. There are two primary types of calibrations: static and dynamic.`,
          {
            innerHtml: `<span style="font-weight: bold;">Static Calibration:</span> This type of calibration is performed in a controlled environment using specialized equipment, including laser technology, to achieve precise measurements. It's typically required for vehicles with more complex camera systems.`,
          },
          {
            innerHtml: `<span style="font-weight: bold;">Dynamic Calibration:</span> For vehicles with simpler camera systems or those that require calibration on the go, our team can perform dynamic calibration using a portable electronic device connected directly to your vehicle's OBD II port. This type of calibration involves driving at specific speeds, covering a specified distance, and optimizing weather conditions to ensure accurate results.`,
          },
          `At Vision Glass, our experienced technicians are trained to handle both static and dynamic ADAS calibration services with precision and expertise. We understand the importance of getting it right the first time, which is why we use only the latest equipment and manufacturer-approved methods to ensure your vehicle's safety features are functioning correctly.`,
        ]}
        imageSrc={IMAGES.ADAS3}
        reverse
        btn={{
          text: `Get Quoted Now`,
          href: ROUTES.QUOTES,
          align: sizeUnder.sm ? "center" : "end",
        }}
      />

      <OtherServicesSections WR AG CC />
    </FullPage>
  );
};
