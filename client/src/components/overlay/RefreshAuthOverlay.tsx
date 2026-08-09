import {
  useAccessKeyStore,
  useRefreshScreenStore,
  useUserStore,
} from "@/stores";
import {
  AbsoluteCenter,
  Stack,
  Heading,
  Center,
  ProgressCircle,
} from "@chakra-ui/react";
import clsx from "clsx";
// import { useEffect } from "react";
import { ActionButton } from "../buttons";
import { useAnimate, motion, AnimatePresence } from "motion/react";
import { CSS, ROUTES, TOKEN_KEYS } from "@/Constants";
import { useLocation } from "react-router";
import {
  useApi,
  useCookieService,
  useNavigationService,
  useTimeoutEffect,
} from "@/hooks";
import { useState } from "react";
import { toString } from "lodash";

const WHITE_LIST = [ROUTES.HOME, ROUTES.ABOUT, ROUTES.CONTACT, ROUTES.QUOTES];

const AUTH_LIST = [
  ROUTES.DASHBOARD,
  ROUTES.CUSTOMERS,
  ROUTES.TEAM,
  ROUTES.REVIEWS,
];

export const RefreshAuthOverlay = () => {
  const { toHome } = useNavigationService();
  const { pathname } = useLocation();
  const { accessKey, setAccessKey } = useAccessKeyStore();
  const { loggedIn, setUser } = useUserStore();

  const { open, setOpen } = useRefreshScreenStore();
  const [scope] = useAnimate();

  const [isGuest, setIsGuest] = useState(false);

  const {
    userRoutes: { loginWithToken, refresh },
  } = useApi();
  const { getCookie, setCookie, clearCookie } = useCookieService();

  const isPublicRoute = () =>
    pathname === ROUTES.LOGIN || WHITE_LIST.includes(pathname);

  const refreshKeys = async () => {
    console.log(`Auth Request (Refresh)`);
    const res = await refresh();

    if (res.err || !res.data) {
      clearCookie(TOKEN_KEYS.REFRESH_KEY);
      clearCookie(TOKEN_KEYS.ACCESS_KEY);
      setOpen(false);
      console.log(`API Refresh Error:`, res.err);
      console.log(``);

      if (isPublicRoute()) return setIsGuest(true);

      return toHome();
    }

    setUser(res.data.user);
    setAccessKey(res.data.token);

    setCookie(TOKEN_KEYS.ACCESS_KEY, res.data.token);
    setOpen(false);
    console.log(``);
  };

  const refreshUserAccess = async () => {
    console.log(`Auth Request (Access)`);
    const accessKeyCookie = getCookie(TOKEN_KEYS.ACCESS_KEY);
    if (!accessKeyCookie) {
      console.log(`No Access Key - Immediate Refresh`);
      return await refreshKeys();
    }

    const res = await loginWithToken(accessKeyCookie);

    if (res.err || !res.data) {
      console.log(`API Error:`, res.err);
      console.log(``);
      if (res.err === "jwt expired") return await refreshKeys();
      clearCookie(TOKEN_KEYS.ACCESS_KEY);
      return;
    }

    console.log(`Response:`);
    console.log(toString(res.data));
    console.log(``);

    setUser(res.data.user);
    setAccessKey(accessKeyCookie);
    setOpen(false);
    console.log(``);
  };

  useTimeoutEffect(
    () => {
      let timeoutKey = null;

      const publicRoute = isPublicRoute();

      if (publicRoute && isGuest) return; // authentication ran and could not authenticate, but user on public route

      if (accessKey || (accessKey && accessKey.length > 0)) return; // is logged in

      if (publicRoute) return refreshUserAccess();

      if (AUTH_LIST.some((authPath) => pathname.startsWith(authPath))) {
        setOpen(true);
        timeoutKey = setTimeout(() => refreshUserAccess(), 500);
      }

      return () => {
        if (timeoutKey) clearTimeout(timeoutKey);
      };
    },
    [pathname, loggedIn, isPublicRoute],
    50,
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={scope}
          className={clsx(
            "absolute top-0 left-0 w-screen h-screen bg-(--accent-blue)",
          )}
          initial={{ translateY: "100%" }}
          animate={{ translateY: 0 }}
          exit={{ translateY: "100%" }}
          transition={{ bounce: 0, duration: 0.25 }}
          style={{ zIndex: 10 }}
        >
          <Center className="relative h-full">
            <Stack>
              <Heading
                className="bg-(--accent-blue) text-white z-1"
                size={"6xl"}
                fontWeight={"black"}
              >
                Vision Auto Glass
              </Heading>

              <Center className="z-1">
                <ActionButton color="white" onClick={() => setOpen(false)}>
                  <Heading fontWeight={"black"}>Close</Heading>
                </ActionButton>
              </Center>

              <AbsoluteCenter className="z-0">
                <div className="scale-400">
                  <ProgressCircle.Root value={null} size="xl">
                    <ProgressCircle.Circle>
                      <ProgressCircle.Track />
                      <ProgressCircle.Range stroke={CSS.colors.blue} />
                    </ProgressCircle.Circle>
                  </ProgressCircle.Root>
                </div>
              </AbsoluteCenter>
            </Stack>
          </Center>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
