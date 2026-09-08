import {
  BorderButton,
  Divider,
  EditDeleteButtons,
  FullPage,
  Icons,
  LargeUserImage,
  LoadingPage,
  NoDataFound,
  PageHeader,
  TBody,
  TEXT_SIZES,
  THeading,
} from "@/components";
import { ROUTES } from "@/Constants";
import {
  useApi,
  useRefreshEffect,
  useTimeoutEffect,
  useUserRestrictions,
} from "@/hooks";
import { type ICustomerQuote, type IUser } from "@/interfaces";
import { useAccessKeyStore, useUserStore } from "@/stores";
import { Link, Stack } from "@mui/material";
import { capitalize } from "lodash";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ProfileCustomersRow } from "./ProfileCustomersRow";
import queryString from "query-string";

export const Profile = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { user: authUser, logout: logoutState } = useUserStore();
  const { setAccessKey } = useAccessKeyStore();

  const {
    snackbar: [_, errorSnack],
    userRoutes,
    customerQuoteRoutes,
  } = useApi();

  const [loading, setLoading] = useState(false);
  const [quotesLoading, setQuotesLoading] = useState(false);

  const [userProfile, setUserProfile] = useState<IUser | undefined>(undefined);
  const { isSameUser: isMyProfile, authorized: authUserCan } =
    useUserRestrictions(userProfile);

  const [currentCustomers, setCurrentCustomers] = useState<ICustomerQuote[]>(
    [],
  );
  const [currentHasMore, setCurrentHasMore] = useState(false);
  const currentCustomerParams: Parameters<
    typeof customerQuoteRoutes.getAllCustomers
  >[0] = {
    pageLimit: 7,
    pageNumber: 1,
    employee: userProfile?.userId ?? "",
    status: ["new", "insurance_validated", "scheduled"],
  };

  const [prevCustomers, setPrevCustomers] = useState<ICustomerQuote[]>([]);
  const [prevHasMore, setPrevHasMore] = useState(false);
  const prevCustomerParams: Parameters<
    typeof customerQuoteRoutes.getAllCustomers
  >[0] = {
    pageLimit: 7,
    pageNumber: 1,
    employee: userProfile?.userId ?? "",
    status: ["done"],
  };

  const getUser = async (userId: string) => {
    setLoading(true);

    const res = await userRoutes.getUser(userId);
    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    setUserProfile(res.data.user);
  };

  const getCurrentCustomers = async () => {
    if (!userProfile) return;

    const res = await customerQuoteRoutes.getAllCustomers(
      currentCustomerParams,
    );

    if (res.err || !res.data) return errorSnack(res.err);

    setCurrentCustomers(res.data.customerQuotes);
    setCurrentHasMore(res.data.totalPages > 1);
  };

  const getPrevCustomers = async () => {
    if (!userProfile) return;

    const res = await customerQuoteRoutes.getAllCustomers(prevCustomerParams);

    if (res.err || !res.data) return errorSnack(res.err);

    setPrevCustomers(res.data.customerQuotes);
    setPrevHasMore(res.data.totalPages > 1);
  };

  useRefreshEffect(
    () => {
      if (
        params?.userId &&
        params.userId.length > 0 &&
        params.userId !== authUser.userId
      ) {
        getUser(params.userId);
      } else {
        setUserProfile(authUser);
      }
    },
    [params.userId, authUser.userId],
    50,
  );

  useTimeoutEffect(
    () => {
      if (!userProfile) return;

      (async () => {
        setQuotesLoading(true);
        await getCurrentCustomers();
        await getPrevCustomers();
        setQuotesLoading(false);
      })();
    },
    [userProfile?.userId],
    50,
  );

  if (loading || !userProfile) return <LoadingPage />;

  // const isMyProfile = userProfile.userId === authUser.userId;
  const fullName = `${capitalize(userProfile.info.firstName)} ${capitalize(userProfile.info.lastName)}`;
  const hasEmail = userProfile.info.email.length > 0;
  const hasPhone = userProfile.info.phone.length > 0;

  const onUserPhotoClick = () => {};

  const onLogout = async () => {
    await userRoutes.logout();
    setAccessKey(null);
    logoutState();
  };

  const onDelete = async () => {
    setLoading(true);

    const res = await userRoutes.deleteUser(userProfile.userId);
    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    navigate(ROUTES.TEAM);
  };

  return (
    <FullPage screen>
      <Stack
        sx={{ width: "100%", paddingBlock: 4, paddingInline: 8 }}
        spacing={4}
      >
        <PageHeader
          backHref={ROUTES.TEAM}
          text={`${isMyProfile ? "My" : "User"} Profile`}
        />

        <Stack
          direction={"row"}
          spacing={4}
          sx={{
            position: "relative",
            alignItems: "start",
            width: "100%",
          }}
        >
          <LargeUserImage onUserPhotoClick={onUserPhotoClick} />

          <Stack
            spacing={0}
            sx={{
              alignItems: "end",
              justifyContent: "space-between",
            }}
          >
            <Stack spacing={0} sx={{ width: "100%", alignItems: "start" }}>
              <THeading>{userProfile.username}</THeading>
              <TBody medium>{fullName.trim()}</TBody>
              {hasEmail && (
                <TBody medium>{userProfile.info.email.trim()}</TBody>
              )}
              {hasPhone && (
                <TBody medium>{userProfile.info.phone.trim()}</TBody>
              )}
              <TBody opacity={0.5} medium>
                {capitalize(userProfile.userType)} Account
              </TBody>
            </Stack>
          </Stack>

          <Stack
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              height: "100%",
              alignItems: "end",
              justifyContent: "space-between",
            }}
          >
            <EditDeleteButtons
              editToolTip="Edit profile"
              editHref={
                authUserCan.edit
                  ? ROUTES.TEAM_EDIT + `/${userProfile.userId}`
                  : undefined
              }
              onDelete={authUserCan.delete ? onDelete : undefined}
              redDelete
            />

            {isMyProfile && (
              <Stack direction={"row"} spacing={2}>
                <Link
                  underline="none"
                  color="inherit"
                  href={ROUTES.PROFILE_PWD(userProfile.userId)}
                >
                  <BorderButton color="blue">
                    <Icons.Password />
                    Change Password
                  </BorderButton>
                </Link>

                <Link underline="none" color="inherit" href={ROUTES.HOME}>
                  <BorderButton onClick={onLogout} color="red">
                    <Icons.Logout sx={{ fontSize: TEXT_SIZES.medium2 }} />{" "}
                    Logout
                  </BorderButton>
                </Link>
              </Stack>
            )}
          </Stack>
        </Stack>

        <Divider />

        {quotesLoading ? (
          <NoDataFound loading />
        ) : (
          <Stack sx={{ width: "100%" }} spacing={4}>
            <ProfileCustomersRow
              quotes={currentCustomers}
              title="Current Customers:"
              noDataMessage={`${isMyProfile ? `You do` : `${userProfile.info.firstName} does`} not have any current customers`}
              href={
                currentHasMore
                  ? `${ROUTES.CUSTOMERS}?${queryString.stringify({ status: currentCustomerParams.status, employee: currentCustomerParams.employee })}`
                  : undefined
              }
            />

            <ProfileCustomersRow
              quotes={prevCustomers}
              title="Prev Customers:"
              noDataMessage={`${isMyProfile ? `You do` : `${userProfile.info.firstName} does`} not have any previous customers`}
              href={
                prevHasMore
                  ? `${ROUTES.CUSTOMERS}?${queryString.stringify({ status: prevCustomerParams.status, employee: prevCustomerParams.employee })}`
                  : undefined
              }
            />
          </Stack>
        )}
      </Stack>
    </FullPage>
  );
};
