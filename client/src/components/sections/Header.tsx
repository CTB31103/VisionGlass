import { IMAGES } from "@/assets";
import {
  usePagePosition,
  useScreenSize,
  useScrollDirection,
  useTimeoutEffect,
} from "@/hooks";
import { useUserStore } from "@/stores";
import { Text } from "@chakra-ui/react";
import { Link, Stack } from "@mui/material";
import clsx from "clsx";
import { ActionButton, IconButton, QuoteButton } from "../buttons";
import { ALL_AUTH_ROUTES, CSS, LOCATIONS, ROUTES } from "@/Constants";
import { useEffect, useRef, useState } from "react";
import { HeaderNavLinks, type HeaderNavLinksProps } from "./HeaderNavLinks";
import { SERVICE_ROUTES, SERVICES } from "@/interfaces";
import { Icons } from "../icons";
import { LocationsMenu } from "./LocationsMenu";
import { useLocation } from "react-router";
import { HeaderDrawer } from "./HeaderDrawer";
import { HeaderSmallBar } from "./HeaderSmallBar";
import { TBody, TEXT_SIZES } from "../typography";

const PUBLIC_ROUTES: HeaderNavLinksProps["links"] = [
  { text: "Home", linkPath: ROUTES.HOME },
  {
    text: "Services",
    linkPath: ROUTES.SERVICES,
    left: true,
    menuOptions: [{ title: `All Services`, linkPath: ROUTES.SERVICES }].concat(
      SERVICES.map((s, i) => ({
        title: s,
        linkPath: SERVICE_ROUTES[i],
      })),
    ),
  },
  {
    text: "Get A Quote",
    linkPath: ROUTES.QUOTES,
    left: true,
    right: true,
  },
  { text: "About", linkPath: ROUTES.ABOUT, right: true },
  { text: "Contact", linkPath: ROUTES.CONTACT },
];

const SMALL_PUBLIC_ROUTES: HeaderNavLinksProps["links"] = [
  ...PUBLIC_ROUTES,
  { text: "Locations", linkPath: ROUTES.CONTACT, menuOptions: LOCATIONS },
];

const NON_AUTH_ROUTES: HeaderNavLinksProps["links"] = [
  { text: "Login", linkPath: ROUTES.LOGIN },
];

const AUTH_ROUTES: HeaderNavLinksProps["links"] = [
  {
    text: "Dashboard",
    linkPath: ROUTES.DASHBOARD,
  },
  { text: "Customers", linkPath: ROUTES.CUSTOMERS, left: true },
  { text: "Team", linkPath: ROUTES.TEAM, left: true },
  { text: "Reviews", linkPath: ROUTES.REVIEWS, left: true },
];

export const Header = () => {
  const location = useLocation();
  const isLoggedIn = useUserStore((state) => state.loggedIn);

  const { lessThanEqualTo: sizeAndUnder } = useScreenSize();

  const anchorRef = useRef<null | HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const [openDrawer, setOpenDrawer] = useState(false);

  const [autoPreferForce, setAutoPreferForce] = useState(false);
  const [preferForce, setPreferForce] = useState(false);
  const [forceExpand, setForceExpand] = useState(false);

  const [scrollExpanded, setScrollExpanded] = useState(true);
  const highUpDirection = useScrollDirection([5, -75]);
  const lowRangeDirection = useScrollDirection();
  const { top } = usePagePosition({
    allowableRange: 0,
  });

  const [preventTopLoop, setPreventTopLoop] = useState(0);

  useEffect(() => {
    const timeoutKey = setTimeout(() => {
      setPreventTopLoop(0);
    }, 300);

    if (preventTopLoop > 3) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    setPreventTopLoop((prev) => prev + 1);

    return () => {
      clearTimeout(timeoutKey);
    };
  }, [scrollExpanded]);

  useEffect(() => {
    if (lowRangeDirection === "down" && forceExpand) {
      setPreferForce(false);
    }
  }, [lowRangeDirection]);

  useTimeoutEffect(
    () => {
      if (preferForce) return setScrollExpanded(forceExpand);

      if (autoPreferForce && !(top || highUpDirection === "up")) return;

      if (top || highUpDirection === "up") {
        setScrollExpanded(true);
        setForceExpand(true);
      } else {
        setScrollExpanded(false);
        setForceExpand(false);
      }

      setAutoPreferForce(false);
    },
    [top, highUpDirection, preferForce],
    50,
  );

  const onExpandContractBtn = () =>
    setForceExpand(() => {
      setPreferForce(true);
      return !expanded;
    });

  useTimeoutEffect(
    () => {
      if (ALL_AUTH_ROUTES.includes(location.pathname)) {
        setAutoPreferForce(true);
        setForceExpand(false);
      }
    },
    [location.pathname],
    1500,
  );

  const expanded =
    preferForce || autoPreferForce ? forceExpand : scrollExpanded;

  return (
    <Stack className={clsx(`sticky top-0 w-full z-5`)}>
      <div
        className={clsx(
          "duration-500! transition-[max-height]! overflow-hidden",
          expanded ? "max-h-90" : "max-h-0",
        )}
      >
        <Stack
          direction={"column"}
          sx={{
            position: "relative",
            bgcolor: CSS.colors.grey,
            alignItems: "center",
            justifyContent: "center",
            paddingBlock: 2,
            borderBottomWidth: 1,
            borderBottomColor: CSS.colors.black,
          }}
          spacing={2}
        >
          <Link href={ROUTES.HOME} variant="inherit" sx={{ zIndex: 2 }}>
            <img
              src={IMAGES.LogoSmall}
              alt="Vision Glass: How Big Is Your Crack?"
              style={{
                width: 175,
              }}
            />
          </Link>

          {sizeAndUnder.md && (
            <Stack
              sx={{ width: "100%", paddingInline: 2, alignItems: "center" }}
              spacing={1}
            >
              <Link href={ROUTES.QUOTES} sx={{ width: "100%" }}>
                <ActionButton fullWidth color="red">
                  Quote me now!
                </ActionButton>
              </Link>
            </Stack>
          )}

          {!sizeAndUnder.md && (
            <Stack
              direction={"row"}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
                width: "100%",
                height: "100%",
                paddingInline: 2,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack spacing={1}>
                <img
                  src={IMAGES.Google5SReviews}
                  alt="Google: Reviews"
                  style={{
                    width: 115,
                  }}
                />
                <Stack
                  ref={anchorRef}
                  direction={"row"}
                  spacing={0.5}
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpen((prev) => !prev)}
                >
                  <Text fontSize={20} className="bungee-outline-thin">
                    Locations
                  </Text>
                  <img
                    style={{
                      width: 20,
                      height: 20,
                      rotate: open ? "180deg" : "0deg",
                    }}
                    src={IMAGES.BorderChevron}
                    alt="View our locations"
                  />
                </Stack>

                <LocationsMenu
                  anchorEl={anchorRef.current}
                  open={open}
                  onClose={() => setOpen(false)}
                />
              </Stack>

              <Stack spacing={1} sx={{ alignItems: "end", zIndex: 1 }}>
                <QuoteButton text="Quote Me Now" />
                <Link href={ROUTES.TELEPHONE}>
                  <Text fontSize={20} className="bungee-outline-thin">
                    (716) 336-7222
                  </Text>
                </Link>
              </Stack>
            </Stack>
          )}
        </Stack>
      </div>

      {sizeAndUnder.md && (
        <Stack sx={{ width: "100%" }}>
          <HeaderSmallBar onDrawer={() => setOpenDrawer((prev) => !prev)} />
          <Stack sx={{ width: "100%", alignItems: "center" }}>
            <Stack
              sx={{
                p: 1,
                paddingInline: 2,
                borderEndStartRadius: 5,
                borderEndEndRadius: 5,
                bgcolor: CSS.colors.red,

                borderWidth: 1,
                borderTopWidth: 0,
                borderColor: CSS.colors.black,

                cursor: "pointer",

                alignItems: "center",
              }}
              onClick={onExpandContractBtn}
              direction={"row"}
              spacing={1}
            >
              <TBody smaller bold color={CSS.colors.white}>
                {expanded ? "Shrink" : "Expand"}
              </TBody>

              {expanded ? (
                <Icons.Contract
                  sx={{ color: CSS.colors.white, fontSize: TEXT_SIZES.medium1 }}
                />
              ) : (
                <Icons.Expand
                  sx={{ color: CSS.colors.white, fontSize: TEXT_SIZES.medium1 }}
                />
              )}
            </Stack>
          </Stack>

          <HeaderDrawer
            openDrawer={openDrawer}
            onClose={() => setOpenDrawer(false)}
            routes={SMALL_PUBLIC_ROUTES.concat(
              isLoggedIn ? AUTH_ROUTES : NON_AUTH_ROUTES,
            )}
          />
        </Stack>
      )}

      {!sizeAndUnder.md && (
        <Stack sx={{ width: "100%", position: "relative" }}>
          <HeaderNavLinks links={PUBLIC_ROUTES} />

          <Stack
            direction={"row"}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",

              alignItems: "center",
              justifyContent: "space-between",

              paddingInline: 2,
              pointerEvents: "none",
            }}
          >
            <Stack sx={{ pointerEvents: "all" }}>
              <IconButton
                Icon={expanded ? Icons.Contract : Icons.Expand}
                bgcolor={CSS.colors.white}
                borderColor={CSS.colors.black}
                color={CSS.colors.black}
                onClick={onExpandContractBtn}
              />
            </Stack>

            <Stack sx={{ pointerEvents: "all" }}>
              <Link href={!isLoggedIn ? ROUTES.LOGIN : ROUTES.PROFILE}>
                <IconButton
                  Icon={Icons.User}
                  bgcolor={CSS.colors.white}
                  borderColor={CSS.colors.black}
                  color={CSS.colors.black}
                />
              </Link>
            </Stack>
          </Stack>
        </Stack>
      )}

      {isLoggedIn && !sizeAndUnder.md && (
        <div
          className={clsx(
            "origin-top duration-500! transition-[max-height]! overflow-hidden",
            expanded ? "max-h-40" : "max-h-0",
          )}
        >
          <HeaderNavLinks
            bgcolor={CSS.colors.red}
            links={AUTH_ROUTES}
            small
            smallText
          />
        </div>
      )}
    </Stack>
  );

  /*
  Version 1
  return (
    <div className="sticky top-0 z-10 bg-(--accent-blue) text-white p-10!">
      <HStack className="justify-between">
        <Box>
          <Link color={CSS.colors.white} variant={"plain"} href={ROUTES.HOME}>
            <Heading size={"2xl"} className="bungee">
              Vision Auto Glass
            </Heading>
          </Link>
        </Box>

        <HStack>
          <LinkBox>
            <LinkOverlay href={isLoggedIn ? "/dashboard" : "/login"} />
            <Icon fontSize="large" style={{ color: CSS.colors.white }} />
          </LinkBox>
        </HStack>
      </HStack>
    </div>
  );
  */
};
