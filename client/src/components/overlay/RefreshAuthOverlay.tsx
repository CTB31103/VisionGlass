import {
  useAccessKeyStore,
  useForceRefreshStore,
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
import { ALL_AUTH_ROUTES, CSS, ROUTES, TOKEN_KEYS } from "@/Constants";
import { useLocation } from "react-router";
import {
  useApi,
  useCookieService,
  useNavigationService,
  useSessionService,
  useTimeoutEffect,
} from "@/hooks";
import { useState } from "react";

export const RefreshAuthOverlay = () => {
  const { toHome } = useNavigationService();
  const { pathname } = useLocation();
  const { accessKey, setAccessKey } = useAccessKeyStore();
  const { user, setUser, logout } = useUserStore();
  const { forceRefresh, setForceRefresh } = useForceRefreshStore();

  const { open, setOpen } = useRefreshScreenStore();
  const [scope] = useAnimate();

  const [loading, setLoading] = useState(false);

  const [_isGuest, setIsGuest] = useState(false);

  const {
    snackbar: [_, errorSnack],
    userRoutes: { loginWithToken, refresh, validAccessKey },
  } = useApi();
  const cookieService = useCookieService();
  const sessionService = useSessionService();

  const isPublicRoute = () =>
    pathname === ROUTES.LOGIN ||
    !ALL_AUTH_ROUTES.some((route) => pathname.startsWith(route));
  // !ALL_AUTH_ROUTES.includes(pathname);

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
    // console.log(`Auth Request (Refresh)`);
    setLoading(true);
    const res = await refresh();

    setLoading(false);

    if (res.err || !res.data) {
      unAuthenticateUser();
      setOpen(false);

      // console.log(`Refresh failed:`);
      // console.log(``);

      if (isPublicRoute()) return setIsGuest(true);

      errorSnack(`Access denied, please login again`);
      return toHome();
    }

    setUser(res.data.user);
    setAccessKey(res.data.token);
    setOpen(false);
  };

  const refreshUserViaAccessToken = async () => {
    // console.log(`Auth Request (Access)`);

    if (!accessKey) {
      // console.log(`No Access Key - Immediate Refresh`);
      return await refreshKeys();
    }

    setLoading(true);
    const res = await loginWithToken(accessKey);

    if (res.err || !res.data) {
      if (res.err === "jwt expired") return await refreshKeys();

      setLoading(false);

      unAuthenticateUser();

      setOpen(false);
      if (!isPublicRoute()) {
        errorSnack(`Access denied, please login again`);
        return toHome();
      }

      return;
    }

    setLoading(false);
    setUser(res.data.user);
    setAccessKey(accessKey);
    setOpen(false);
  };

  const authenticate = async () => {
    let timeoutKey = null;
    const publicRoute = isPublicRoute();
    const isAccessKeyValid = await validAccessKey();

    const shouldRefreshWithAccess =
      (accessKey && !isAccessKeyValid) || // Has access key but access key is invalid
      (isAccessKeyValid && user.userId.length === 0); // Has valid access key but no user data

    if (publicRoute) {
      if (shouldRefreshWithAccess) refreshUserViaAccessToken();
      else refreshKeys();
      return timeoutKey;
    }

    if (ALL_AUTH_ROUTES.some((authPath) => pathname.startsWith(authPath))) {
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
      // console.log(`Pathname: ${pathname}`);
      // console.log(``);
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

  useTimeoutEffect(
    () => {
      if (loading || !forceRefresh) return;

      let timeoutKey: number | null = null;

      (async () => {
        timeoutKey = (await authenticate()) || null;
        setForceRefresh(false);
      })();
      return () => {
        if (timeoutKey) clearTimeout(timeoutKey);
      };
    },
    [forceRefresh],
    75,
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
