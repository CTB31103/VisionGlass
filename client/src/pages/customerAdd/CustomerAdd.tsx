import {
  ActionButton,
  BasicModal,
  BorderButton,
  CustomerQuoteForms,
  FullPage,
  LabledRowText,
  PageHeader,
  TitleWithSubtitle,
} from "@/components";
import { ROUTES } from "@/Constants";
import { useCreateCustomerQuoteService, useScreenSize } from "@/hooks";
import { Link, Stack } from "@mui/material";
import { useNavigate } from "react-router";

export const CustomerAdd = () => {
  const navigate = useNavigate();

  const { lessThanEqualTo } = useScreenSize();

  const {
    contactInfo,
    carInfo,
    carDamage,
    paymentOptions,
    meetingInfo,

    loading,
    isEditingPage,
    createdQuote,
    successModelOpen,

    submitToAPI,
  } = useCreateCustomerQuoteService();

  return (
    <FullPage screen>
      <Stack
        sx={{
          width: "100%",
          paddingBlock: lessThanEqualTo.md ? 6 : 4,
          paddingInline: lessThanEqualTo.xs ? 2 : 8,
          pb: lessThanEqualTo.md ? 2 : undefined,
        }}
        spacing={4}
      >
        <PageHeader
          onGoBack={() => navigate(-1)}
          text={isEditingPage ? `Edit Customer` : "Add Customer"}
        />

        <Stack spacing={4} sx={{ width: "100%" }}>
          <TitleWithSubtitle
            title="Contact Information"
            subtitle="Basic customer information"
          />
          <CustomerQuoteForms.ContactInfo state={contactInfo} />

          <TitleWithSubtitle
            title="Car Information"
            subtitle="Basic customer vehicle information"
          />
          <CustomerQuoteForms.CarInfo state={carInfo} optional />

          <TitleWithSubtitle
            title="Car Damage"
            subtitle="Record the damage to be fixed"
          />
          <CustomerQuoteForms.CarDamage state={carDamage} optional />

          <TitleWithSubtitle
            title="Payment"
            subtitle="Record the customers choosen payment option and set the price of services to be rendered"
          />
          <CustomerQuoteForms.PaymentOptions state={paymentOptions} fullForm />

          <TitleWithSubtitle
            title="Scheduling"
            subtitle="Lock in a date and time to complete the service!"
          />
          <CustomerQuoteForms.MeetingInfo state={meetingInfo} />

          <Stack
            sx={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActionButton loading={loading} onClick={submitToAPI} color="red">
              {isEditingPage ? "Edit" : "Create"} Customer
            </ActionButton>
          </Stack>
        </Stack>

        <BasicModal
          open={successModelOpen}
          title="Success"
          subtitle={
            isEditingPage
              ? "Customer updated in the system"
              : "Customer added to the system"
          }
          shrinkHeight
        >
          <Stack
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
            direction={lessThanEqualTo.md ? "column" : "row"}
            spacing={lessThanEqualTo.md ? 1 : 4}
          >
            <Stack spacing={1} sx={{}}>
              <LabledRowText
                bold="Customer:"
                text={`${contactInfo.firstName} ${contactInfo.lastName}`}
              />
              <LabledRowText bold="Phone:" text={`${contactInfo.phone}`} />
            </Stack>

            <Stack sx={{}}>
              <LabledRowText
                bold="Service Price:"
                text={`$${paymentOptions.servicePrice.toFixed(2)}`}
              />
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link href={ROUTES.CUSTOMERS}>
              <BorderButton color="blue">Close</BorderButton>
            </Link>

            {createdQuote && (
              <Link
                href={ROUTES.CUSTOMERS + `/${createdQuote.customerQuoteId}`}
              >
                <ActionButton color="red">To Customer</ActionButton>
              </Link>
            )}
          </Stack>
        </BasicModal>
      </Stack>
    </FullPage>
  );
};
