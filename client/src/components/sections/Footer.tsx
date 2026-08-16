import { CSS, ROUTES } from "@/Constants";
import { IMAGES } from "@/assets";
import { ServiceAreas } from "./ServiceAreas";
import { Stack } from "@mui/material";
import { FooterColumn } from "./FooterColumn";
import { useLocation } from "react-router";
import { useScreenSize } from "@/hooks";

export const Footer = () => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  const { pathname } = useLocation();
  const isContact = pathname.includes(ROUTES.CONTACT);
  return (
    <Stack>
      {!isContact && <ServiceAreas />}

      <Stack
        direction={sizeUnder.sm ? "column" : "row"}
        sx={{
          paddingBlock: 4,
          paddingInline: sizeUnder.md ? 2 : 8,
          alignItems: "center",
          justifyContent: sizeUnder.sm ? "center" : "space-between",
          bgcolor: CSS.colors.blue,
        }}
        spacing={sizeUnder.sm ? 4 : 0}
      >
        <Stack
          sx={{
            p: sizeUnder.md ? 1 : 4,
            borderRadius: "25vw",
            bgcolor: CSS.colors.white,
            width: sizeUnder.xs ? "50vw" : sizeUnder.sm ? "30vw" : "20vw",
            height: sizeUnder.xs ? "50vw" : sizeUnder.sm ? "30vw" : "20vw",

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{
              width: "100%",
            }}
            src={IMAGES.LogoSmall}
            alt="Vison Glass: How big is your crack?"
          />
        </Stack>

        <Stack
          direction={sizeUnder.xs ? "column" : "row"}
          sx={{
            alignItems: sizeUnder.xs ? "center" : "start",
            justifyContent: sizeUnder.xs ? "start" : "end",
          }}
          spacing={sizeUnder.md ? 2 : 4}
        >
          <FooterColumn
            title="Services"
            items={[
              { text: "Windshield Replacement", href: ROUTES.SERVICE_WR },
              { text: "Auto Glass Replacement", href: ROUTES.SERVICE_AG },
              { text: "ADAS Calibration", href: ROUTES.SERVICE_ADAS },
              { text: "Chip & Crack Repair", href: ROUTES.SERVICE_CC },
              { text: "Mobile Installation", href: ROUTES.SERVICE_MB },
            ]}
          />
          <FooterColumn
            title="Contact Us"
            items={[
              {
                text: "By Phone:<br/>&nbsp;&nbsp;&nbsp;&nbsp;(716) 336-7222",
                href: ROUTES.CONTACT,
              },
              {
                text: `By Email:<br/>&nbsp;&nbsp;&nbsp;&nbsp;quotemenow@visionglass.com`,
                href: ROUTES.CONTACT,
              },
            ]}
          />
          <FooterColumn
            title="Site Map"
            items={[
              { text: "Home", href: ROUTES.HOME },
              { text: "Services", href: ROUTES.SERVICES },
              { text: "Get A Quote", href: ROUTES.QUOTES },
              { text: "About", href: ROUTES.ABOUT },
              { text: "Contact", href: ROUTES.CONTACT },
              { text: "Login", href: ROUTES.LOGIN },
            ]}
          />
        </Stack>
      </Stack>
    </Stack>
  );

  /*
  return (
    <Stack
      p={lessThanEqualTo.sm ? 5 : 20}
      pb={10}
      gap={10}
      className="bg-(--accent-blue) text-white "
    >
      <Center>
        <Heading
          textAlign={"center"}
          size={exactScreenSizeValues(
            [
              combineLowHighRanges(
                ExactScreenSizeEnums.xs,
                ExactScreenSizeEnums.sm,
              ),
            ],
            ["4xl"],
            "6xl",
          )}
          className="bungee-outline"
        >
          Vision Auto Glass
        </Heading>
      </Center>
      <Divider color={CSS.colors.white} />

      <Box
        display={"flex"}
        flexDirection={exactScreenSizeValues(
          [
            combineLowHighRanges(
              ExactScreenSizeEnums.xs,
              ExactScreenSizeEnums.sm,
            ),
          ],
          ["column"],
          "row",
        )}
        gap={lessThanEqualTo.sm ? 10 : 0}
        paddingInline={lessThanEqualTo.sm ? 5 : 20}
        position={"relative"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack
          className={clsx(lessThanEqualTo.sm ? "w-full" : "")}
          gap={5}
          alignItems={lessThanEqualTo.sm ? "center" : ""}
        >
          <Heading color={CSS.colors.white} className="bungee" size={"3xl"}>
            <Link color={CSS.colors.white} href="/">
              Home
            </Link>
          </Heading>
          <Heading className="bungee" size={"3xl"}>
            <Link color={CSS.colors.white} href="/about">
              About
            </Link>
          </Heading>
          <Heading className="bungee" size={"3xl"}>
            <Link color={CSS.colors.white} href="/contact">
              Contact
            </Link>
          </Heading>
          <Heading className="bungee" size={"3xl"}>
            <Link color={CSS.colors.white} href="/contact">
              Review Us
            </Link>
          </Heading>
        </Stack>

        <Box
          className={clsx(
            lessThanEqualTo.sm
              ? ""
              : "absolute top-0 left-0 w-full h-full pointer-events-none",
          )}
        >
          <Center className="w-full h-full">
            <Box className="pointer-events-auto">
              <QuoteButton text="Get a free quote" />
            </Box>
          </Center>
        </Box>

        <Stack gap={5}>
          <HStack gap={5}>
            <Box className="min-w-12.5 min-h-12.5 w-[5vw] h-[5vw] rounded-sm overflow-hidden">
              <img
                className="w-full h-full object-fill"
                src={IMAGES_V1.SmInsta}
                alt="Vision Auto Glass - Instagram"
              />
            </Box>
            <Box className="min-w-12.5 min-h-12.5 w-[5vw] h-[5vw] rounded-sm overflow-hidden">
              <img
                className="w-full h-full object-fill"
                src={IMAGES_V1.SmLinkedin}
                alt="Vision Auto Glass - LinkedIn"
              />
            </Box>
          </HStack>
          <HStack gap={5}>
            <Box className="min-w-12.5 min-h-12.5 w-[5vw] h-[5vw] rounded-sm overflow-hidden">
              <img
                className="w-full h-full object-fill"
                src={IMAGES_V1.SmFacebook}
                alt="Vision Auto Glass - Facebook"
              />
            </Box>
            <Box className="min-w-12.5 min-h-12.5 w-[5vw] h-[5vw] rounded-sm overflow-hidden">
              <img
                className="w-full h-full object-fill"
                src={IMAGES_V1.SmTwitter}
                alt="Vision Auto Glass - Twitter"
              />
            </Box>
          </HStack>
        </Stack>
      </Box>

      <Divider color={CSS.colors.white} />
      <Stack>
        <Center>
          <Heading
            textAlign={"center"}
            color={CSS.colors.white}
            className="bungee"
          >
            Website created by
            <br />
            Tondreau-Tech
          </Heading>
        </Center>
        <Center>
          <Text textAlign={"center"} color={CSS.colors.white}>
            © 2026 Tondreau-Tech. All rights reserved.
          </Text>
        </Center>
      </Stack>
    </Stack>
  );
  */
};
