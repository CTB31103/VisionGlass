import { IMAGES } from "@/assets";
import { usePagePosition, useScrollDirection, useTimeoutEffect } from "@/hooks";
import { useUserStore } from "@/stores";
import { Text } from "@chakra-ui/react";

import { Divider, Link, Menu, MenuItem, Stack } from "@mui/material";
import clsx from "clsx";
import { QuoteButton } from "../buttons";
import { CSS, ROUTES } from "@/Constants";
import { useRef, useState } from "react";
import { HeaderNavLinks } from "./HeaderNavLinks";

export const Header = () => {
  const isLoggedIn = useUserStore((state) => state.loggedIn);
  const direction = useScrollDirection();
  const { top } = usePagePosition({ allowableRange: 50 });

  const isGoingDown = direction === "down";

  const anchorRef = useRef<null | HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const [expanded, setExpanded] = useState(true);

  useTimeoutEffect(
    () => {
      setExpanded(!isGoingDown || top);
    },
    [isGoingDown, top],
    50,
  );

  return (
    <Stack className={clsx(`sticky top-0 w-full z-5`)}>
      <div
        className={clsx(
          "duration-500! transition-[max-height]! overflow-hidden",
          expanded ? "max-h-40" : "max-h-0",
        )}
      >
        <Stack
          direction={"row"}
          sx={{
            position: "relative",
            bgcolor: CSS.colors.grey,
            alignItems: "center",
            justifyContent: "center",
            paddingBlock: 2,
            borderBottomWidth: 1,
            borderBottomColor: CSS.colors.black,
          }}
        >
          <Link href={ROUTES.HOME} variant="inherit" sx={{ zIndex: 1 }}>
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
                <MenuItem onClick={close}>
                  <Link href={ROUTES.SERVICE_AREAS + "#NY"}>New York</Link>
                </MenuItem>
                <Divider />
                <MenuItem onClick={close}>
                  <Link href={ROUTES.SERVICE_AREAS}>South Carolina</Link>
                </MenuItem>
                <Divider />
                <MenuItem onClick={close}>
                  <Link href={ROUTES.SERVICE_AREAS}>Kentucky</Link>
                </MenuItem>
                <Divider />
                <MenuItem onClick={close}>
                  <Link href={ROUTES.SERVICE_AREAS}>Massachusetts</Link>
                </MenuItem>
                <Divider />
                <MenuItem onClick={close}>
                  <Link href={ROUTES.SERVICE_AREAS}>Connecticut</Link>
                </MenuItem>
                <Divider />
                <MenuItem onClick={close}>
                  <Link href={ROUTES.SERVICE_AREAS}>Florida</Link>
                </MenuItem>
              </Menu>
            </Stack>

            <Stack spacing={1} sx={{ alignItems: "end", zIndex: 1 }}>
              <QuoteButton text="Quote Me Now" />
              <Link href={ROUTES.CONTACT}>
                <Text fontSize={20} className="bungee-outline-thin">
                  (716) 336-7222
                </Text>
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </div>

      <HeaderNavLinks
        links={[
          { text: "Home", linkPath: ROUTES.HOME },
          { text: "Services", linkPath: ROUTES.SERVICES, left: true },
          {
            text: "Get A Quote",
            linkPath: ROUTES.QUOTES,
            left: true,
            right: true,
          },
          { text: "About", linkPath: ROUTES.ABOUT, right: true },
          { text: "Contact", linkPath: ROUTES.CONTACT },
        ]}
      />

      {isLoggedIn && (
        <div
          className={clsx(
            "origin-top duration-500! transition-[max-height]! overflow-hidden",
            // isGoingDown && !top ? "max-h-0" : "max-h-40",
            expanded ? "max-h-40" : "max-h-0",
          )}
        >
          <HeaderNavLinks
            bgcolor={CSS.colors.red}
            links={[
              {
                text: "Dashboard",
                linkPath: ROUTES.DASHBOARD,
              },
              { text: "Customers", linkPath: ROUTES.CUSTOMERS, left: true },
              { text: "Team", linkPath: ROUTES.TEAM, left: true },
              { text: "Reviews", linkPath: ROUTES.REVIEWS, left: true },
            ]}
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
