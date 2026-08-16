import { IMAGES } from "@/assets";
import { ActionButton, FullPage, HeroImage, THeading } from "@/components";
import { Link, Stack } from "@mui/material";
import { CSS, ROUTES } from "@/Constants";
import { OurReviews } from "./OurReviews";
import { WhyChooseUs } from "./WhyChooseUs";
import { OurStory } from "./OurStory";
import { useScreenSize } from "@/hooks";

export const About = () => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  return (
    <FullPage screen>
      <HeroImage src={IMAGES.VGHoodies}>
        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
            paddingInline: sizeUnder.sm ? 1 : undefined,
            paddingBlock: sizeUnder.sm ? 4 : undefined,
          }}
          spacing={2}
        >
          <Stack
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              color: CSS.colors.white,
            }}
          >
            <THeading large bungee align="center">
              Vision Glass
            </THeading>
            <THeading bungee thin align="center">
              We don't wanna be just any Glass shop
            </THeading>
            <THeading bungee thin align="center">
              We wanna be your Glass shop
            </THeading>
          </Stack>
          <Link href={ROUTES.QUOTES}>
            <ActionButton color="red">Lets do it!</ActionButton>
          </Link>
        </Stack>
      </HeroImage>

      <OurStory />

      <WhyChooseUs />

      <OurReviews />
    </FullPage>
  );

  // return (
  //   <FullPage screen>
  //     <Stack paddingBlock={20} gap={20}>
  //       <Stack gap={10} paddingInline={20}>
  //         <Heading textAlign={"center"} className="bungee" size={"6xl"}>
  //           About Us
  //         </Heading>

  //         <Box
  //           bg={"green"}
  //           className="relative w-full flex items-center justify-center h-[60vh] max-h-[60vh] overflow-hidden rounded-xl"
  //         >
  //           <Box className="absolute top-0 left-0 w-full h-full z-2 bg-(--accent-blue) opacity-30" />
  //           <img
  //             className="shrink-0 min-w-full min-h-full object-cover object-center"
  //             src={IMAGES_V1.FullTeam}
  //             alt="Vision Auto Glass - Full Team"
  //           />
  //         </Box>

  //         <Stack gap={0}>
  //           <Heading textAlign={"center"} className="bungee" size={"3xl"}>
  //             At
  //           </Heading>
  //           <Heading textAlign={"center"} className="bungee" size={"6xl"}>
  //             Vision Auto Glass
  //           </Heading>
  //         </Stack>

  //         <Text textAlign={"center"} fontSize={"3xl"}>
  //           Our team at <b>Vision Auto Glass</b> is dedicated to ensuring that
  //           your needs are met with <b>care and professionalism</b>. We
  //           understand how inconvenient a damaged windshield can be, and we are
  //           here to make the process as smooth as possible. With{" "}
  //           <b>top-quality service</b> and <b>comprehensive support</b>, you can
  //           trust us to get you back on the road safely and quickly.
  //         </Text>
  //       </Stack>

  //       <Stack>
  //         <Heading textAlign={"center"} className="bungee" size={"6xl"}>
  //           Why Choose Us
  //         </Heading>

  //         <Center className="w-full">
  //           <Box
  //             className={clsx(
  //               lessThanEqualTo.sm
  //                 ? "w-full flex flex-col gap-y-2.5"
  //                 : "w-[80vw] gap-5 flex row justify-between items-center",
  //             )}
  //             paddingInline={lessThanEqualTo.sm ? 10 : undefined}
  //           >
  //             <div className={clsx("flex-[.33] left-card service-card")}>
  //               <LargeIconCard
  //                 icon={(styles) => <HandymanIcon style={styles} />}
  //                 small
  //                 title="Repair"
  //                 desc="No matter the damage, if its glass we can repair it or replace it!"
  //               />
  //             </div>
  //             <div
  //               className={clsx(
  //                 "relative z-2 flex-[.33] center-card service-card",
  //               )}
  //             >
  //               <LargeIconCard
  //                 icon={(styles) => <DirectionsCarIcon style={styles} />}
  //                 title="Installation"
  //                 desc="Our expert technicians will provide excellent quality installation!"
  //               />
  //             </div>
  //             <div
  //               className={clsx(
  //                 "relative z-1 flex-[.33] right-card service-card",
  //               )}
  //             >
  //               <LargeIconCard
  //                 icon={(styles) => <Diversity3Icon style={styles} />}
  //                 small
  //                 title="Protection"
  //                 desc="We guarantee that when your car leaves us its more secure than before!"
  //               />
  //             </div>
  //           </Box>
  //         </Center>
  //       </Stack>

  //       <Stack className="relative w-full">
  //         <img src={IMAGES_V1.TriangleBg} alt="triangle-background" />
  //         <AbsoluteCenter>
  //           <Center>{/* <Heading */}</Center>
  //         </AbsoluteCenter>
  //       </Stack>
  //     </Stack>
  //   </FullPage>
  // );
};
