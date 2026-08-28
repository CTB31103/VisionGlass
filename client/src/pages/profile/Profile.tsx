import {
  Divider,
  EditDeleteButtons,
  FullPage,
  Icons,
  NoDataFound,
  PageHeader,
  TBody,
  TEXT_SIZES,
  THeading,
} from "@/components";
import { CSS, ROUTES } from "@/Constants";
import { useApi, useDimensions, useTimeoutEffect } from "@/hooks";
import type { ICustomerQuote, IUser } from "@/interfaces";
import { useUserStore } from "@/stores";
import { Spinner } from "@chakra-ui/react";
import { Stack } from "@mui/material";
import { capitalize } from "lodash";
import { useState } from "react";
import { useParams } from "react-router";
import { ProfileCustomersRow } from "./ProfileCustomersRow";
import queryString from "query-string";

export const Profile = () => {
  const params = useParams();

  const authUser = useUserStore((state) => state.user);
  const [squareRef, squareDims] = useDimensions();

  const {
    snackbar: [_, errorSnack],
    userRoutes,
    customerQuoteRoutes,
  } = useApi();

  const [loading, setLoading] = useState(false);
  const [quotesLoading, setQuotesLoading] = useState(false);

  const [userProfile, setUserProfile] = useState<IUser | undefined>(undefined);

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

    setUserProfile(res.data.users[0]);
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

  useTimeoutEffect(
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

  if (loading || !userProfile)
    return (
      <FullPage screen>
        <Stack
          sx={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner size={"xl"} />
        </Stack>
      </FullPage>
    );

  const isMyProfile = userProfile.userId === authUser.userId;
  const fullName = `${capitalize(userProfile.info.firstName)} ${capitalize(userProfile.info.lastName)}`;
  const hasEmail = userProfile.info.email.length > 0;
  const hasPhone = userProfile.info.phone.length > 0;

  const onUserPhotoClick = () => {};

  return (
    <FullPage screen>
      <Stack
        sx={{ width: "100%", paddingBlock: 4, paddingInline: 8 }}
        spacing={4}
      >
        <PageHeader text={`${isMyProfile ? "My" : "User"} Profile`} />

        <Stack
          sx={{ width: "100%", justifyContent: "space-between" }}
          direction={"row"}
        >
          <Stack direction={"row"} spacing={4} sx={{ alignItems: "start" }}>
            <Stack
              ref={squareRef}
              sx={{
                width: "20vw",
                height: squareDims.width,

                alignItems: "center",
                justifyContent: "center",

                borderWidth: 1,
                borderColor: CSS.colors.black,
                borderRadius: 5,

                cursor: "pointer",
                color: CSS.colors.black,

                "&:hover": {
                  borderColor: CSS.colors.blue,
                  color: CSS.colors.blue,
                },
              }}
              onClick={onUserPhotoClick}
            >
              <Icons.User sx={{ fontSize: TEXT_SIZES.largest * 1.75 }} />
            </Stack>

            <Stack spacing={-0.5} sx={{ alignItems: "start" }}>
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

          <Stack>
            <EditDeleteButtons onEdit={() => {}} />
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
