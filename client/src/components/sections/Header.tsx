import { IMAGES } from "@/assets";
import {
  usePagePosition,
  useScreenSize,
  useScrollDirection,
  useTimeoutEffect,
} from "@/hooks";
import { useUserStore } from "@/stores";
import { Text } from "@chakra-ui/react";
import { Divider, Drawer, Link, Menu, MenuItem, Stack } from "@mui/material";
import clsx from "clsx";
import { ActionButton, IconButton, QuoteButton } from "../buttons";
import { CSS, ROUTES } from "@/Constants";
import { useRef, useState } from "react";
import { HeaderNavLinks, type HeaderNavLinksProps } from "./HeaderNavLinks";
import { SERVICE_ROUTES, SERVICES } from "@/interfaces";
import { Icons } from "../icons";
import { TEXT_SIZES, THeading } from "../typography";
import { DrawerItem } from "./DrawerItem";

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

const LOCATIONS = [
  {
    title: "New York",
    linkPath: ROUTES.CONTACT,
  },
  {
    title: "South Carolina",
    linkPath: ROUTES.CONTACT,
  },
  {
    title: "Kentucky",
    linkPath: ROUTES.CONTACT,
  },
  {
    title: "Massachusetts",
    linkPath: ROUTES.CONTACT,
  },
  {
    title: "Connecticut",
    linkPath: ROUTES.CONTACT,
  },
  {
    title: "Florida",
    linkPath: ROUTES.CONTACT,
  },
];

const SMALL_PUBLIC_ROUTES: HeaderNavLinksProps["links"] = [
  ...PUBLIC_ROUTES,
  { text: "Locations", linkPath: ROUTES.CONTACT, menuOptions: LOCATIONS },
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
  const isLoggedIn = useUserStore((state) => state.loggedIn);

  const { lessThanEqualTo: sizeAndUnder } = useScreenSize();

  const anchorRef = useRef<null | HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const [openDrawer, setOpenDrawer] = useState(false);

  const [expanded, setExpanded] = useState(true);
  const direction = useScrollDirection();
  const { top, scrollY } = usePagePosition({
    allowableRange: 0,
  });

  useTimeoutEffect(
    () => {
      if (top || direction === "up" || scrollY === 0) setExpanded(true);
      else setExpanded(false);
    },
    [top, direction],
    50,
  );

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

                <Menu
                  anchorEl={anchorRef.current}
                  open={open}
                  onClose={() => setOpen(false)}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  slotProps={{
                    paper: {
                      sx: {
                        border: 2,
                        borderColor: CSS.colors.black,
                      },
                    },
                    list: {
                      sx: {},
                      dense: true,
                    },
                  }}
                >
                  {LOCATIONS.map((loc, i) => (
                    <Stack sx={{ width: "100%" }} key={i}>
                      <MenuItem onClick={close}>
                        <Link href={loc.linkPath}>{loc.title}</Link>
                      </MenuItem>
                      <Divider />
                    </Stack>
                  ))}
                </Menu>
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
        <>
          <Stack
            direction={"row"}
            sx={{
              bgcolor: CSS.colors.blue,
              paddingBlock: 1,
              paddingInline: 2,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Stack
              direction={"row"}
              spacing={2}
              sx={{ alignItems: "center", color: CSS.colors.white }}
            >
              <IconButton
                Icon={Icons.Menu}
                bgcolor={CSS.colors.white}
                borderColor={CSS.colors.black}
                color={CSS.colors.black}
                onClick={() => setOpenDrawer((prev) => !prev)}
              />

              <Link href={ROUTES.HOME} color="inherit">
                <THeading bold>Vision Glass</THeading>
              </Link>
            </Stack>

            <Stack direction={"row"} spacing={0}>
              <IconButton
                Icon={Icons.Location}
                borderColor={CSS.colors.white}
              />

              <IconButton Icon={Icons.Phone} borderColor={CSS.colors.white} />
            </Stack>
          </Stack>

          <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
            <Stack
              sx={{
                width: sizeAndUnder.xs ? "100vw" : "75vw",
                height: "100%",

                bgcolor: CSS.colors.grey,

                position: "relative",
              }}
            >
              <Stack
                sx={{
                  width: "100%",
                  position: "sticky",
                  top: 0,
                  left: 0,
                  zIndex: 2,
                }}
              >
                <Stack
                  sx={{
                    width: "100%",
                    alignItems: "center",
                    position: "relative",

                    bgcolor: CSS.colors.grey,
                    borderBottomWidth: 2,
                    borderColor: CSS.colors.black,

                    paddingInline: 4,
                    paddingBlock: 2,
                  }}
                >
                  <Link href={ROUTES.HOME} variant="inherit">
                    <img
                      src={IMAGES.LogoSmall}
                      alt="Vision Glass: How Big Is Your Crack?"
                      style={{
                        width: 175,
                      }}
                    />
                  </Link>

                  <Stack
                    direction={"row"}
                    sx={{
                      position: "absolute",
                      height: "100%",
                      top: 0,
                      left: 0,
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      onClick={() => setOpenDrawer(false)}
                      Icon={Icons.Close}
                      fontSize={TEXT_SIZES.large}
                      color={CSS.colors.black}
                    />
                  </Stack>
                </Stack>
              </Stack>

              <Stack
                sx={{
                  paddingInline: 4,
                  pt: 2,
                  pb: 8,
                  width: "100%",
                  height: "100%",
                  bgcolor: CSS.colors.blue,
                  overflowY: "scroll",
                }}
                spacing={2}
              >
                {SMALL_PUBLIC_ROUTES.map((route, i, arr) => (
                  <DrawerItem
                    key={i}
                    {...route}
                    divider={i !== arr.length - 1 || isLoggedIn}
                  />
                ))}
                {isLoggedIn &&
                  AUTH_ROUTES.map((route, i, arr) => (
                    <DrawerItem
                      key={i}
                      {...route}
                      divider={i !== arr.length - 1}
                    />
                  ))}
              </Stack>
            </Stack>
          </Drawer>
        </>
      )}

      {!sizeAndUnder.md && <HeaderNavLinks links={PUBLIC_ROUTES} />}

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
