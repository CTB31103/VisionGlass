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
import { ActionButton } from "../buttons";
import { useAnimate, motion, AnimatePresence } from "motion/react";
import { CSS, ROUTES, TOKEN_KEYS } from "@/Constants";
import { useLocation } from "react-router";
import {
  useApi,
  useCookieService,
  useNavigationService,
  useSessionService,
  useTimeoutEffect,
} from "@/hooks";
import { useState } from "react";

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
  const { user, setUser, logout } = useUserStore();

  const { open, setOpen } = useRefreshScreenStore();
  const [scope] = useAnimate();

  const [_isGuest, setIsGuest] = useState(false);

  const {
    userRoutes: { loginWithToken, refresh, validAccessKey },
  } = useApi();
  const cookieService = useCookieService();
  const sessionService = useSessionService();

  const isPublicRoute = () =>
    pathname === ROUTES.LOGIN || WHITE_LIST.includes(pathname);

  const clearBothStorages = (key: string) => (
    cookieService.clearCookie(key),
    sessionService.clearSessionValue(key)
  );

  const unAuthenticateUser = () => {
    clearBothStorages(TOKEN_KEYS.REFRESH_KEY);
    clearBothStorages(TOKEN_KEYS.ACCESS_KEY);
    setAccessKey(null);
    logout();
  };

  const refreshKeys = async () => {
    console.log(`Auth Request (Refresh)`);
    const res = await refresh();

    if (res.err || !res.data) {
      unAuthenticateUser();
      setOpen(false);

      console.log(`Refresh failed:`);
      console.log(``);

      if (isPublicRoute()) return setIsGuest(true);

      return toHome();
    }

    setUser(res.data.user);
    setAccessKey(res.data.token);
    setOpen(false);
  };

  const refreshUserViaAccessToken = async () => {
    console.log(`Auth Request (Access)`);

    if (!accessKey) {
      console.log(`No Access Key - Immediate Refresh`);
      return await refreshKeys();
    }

    const res = await loginWithToken(accessKey);

    if (res.err || !res.data) {
      if (res.err === "jwt expired") return await refreshKeys();

      unAuthenticateUser();

      setOpen(false);
      if (!isPublicRoute()) return toHome();

      return;
    }

    setUser(res.data.user);
    setAccessKey(accessKey);
    setOpen(false);
  };

  const authenticate = async () => {
    let timeoutKey = null;
    const publicRoute = isPublicRoute();
    const isAccessKeyValid = await validAccessKey();
    const refreshKey = cookieService.getCookie(TOKEN_KEYS.REFRESH_KEY);

    const shouldRefreshWithAccess =
      (accessKey && !isAccessKeyValid) || // Has access key but access key is invalid
      (isAccessKeyValid && user.userId.length === 0); // Has valid access key but no user data

    // const shouldRefreshWithRefresh =
    //   refreshKey && refreshKey.length > 0 ? true : false;

    if (publicRoute) {
      console.log(`Refresh Auth Overlay:`);
      console.log(`Public Route`);
      console.log(`shouldRefreshWithAccess: ${shouldRefreshWithAccess}`);
      // console.log(`shouldRefreshWithRefresh: ${shouldRefreshWithRefresh}`);
      console.log(`refreshKey: ${refreshKey}`);
      console.log(`TOKEN_KEYS.REFRESH_KEY: ${TOKEN_KEYS.REFRESH_KEY}`);
      console.log(``);
      if (shouldRefreshWithAccess) refreshUserViaAccessToken();
      else refreshKeys();
      return timeoutKey;
    }

    if (AUTH_LIST.some((authPath) => pathname.startsWith(authPath))) {
      if (isAccessKeyValid && user.userId.length !== 0) return timeoutKey;

      setOpen(true);
      timeoutKey = setTimeout(() => {
        if (shouldRefreshWithAccess) refreshUserViaAccessToken();
        else refreshKeys();
      }, 500);
    }

    return timeoutKey;
  };

  useTimeoutEffect(
    () => {
      let timeoutKey: number | null = null;

      (async () => {
        timeoutKey = (await authenticate()) || null;
      })();
      return () => {
        if (timeoutKey) clearTimeout(timeoutKey);
      };
    },
    [pathname],

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
                <ActionButton color="red" onClick={() => setOpen(false)}>
                  Close
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
