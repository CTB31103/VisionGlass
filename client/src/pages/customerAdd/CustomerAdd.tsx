import {
  ActionButton,
  BasicModal,
  BorderButton,
  CustomerQuoteForms,
  FullPage,
  PageHeader,
  TBody,
  TitleWithSubtitle,
} from "@/components";
import { ROUTES } from "@/Constants";
import { useCreateCustomerQuoteService } from "@/hooks";
import { Link, Stack } from "@mui/material";
import { useNavigate } from "react-router";

export const CustomerAdd = () => {
  const navigate = useNavigate();

  const {
    contactInfo,
    carInfo,
    carDamage,
    paymentOptions,
    meetingInfo,

    loading,
    createdQuote,
    successModelOpen,

    submitToAPI,
  } = useCreateCustomerQuoteService();

  return (
    <FullPage screen>
      <Stack
        sx={{ width: "100%", paddingBlock: 4, paddingInline: 8 }}
        spacing={4}
      >
        <PageHeader onGoBack={() => navigate(-1)} text="Add Customer" />

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
              Create Customer
            </ActionButton>
          </Stack>
        </Stack>

        <BasicModal
          open={successModelOpen}
          title="Success"
          subtitle="Customer added to the system"
        >
          <Stack
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
            direction={"row"}
            spacing={4}
          >
            <Stack spacing={1}>
              <Stack direction={"row"} spacing={1}>
                <TBody bold>Customer:</TBody>
                <TBody>
                  {contactInfo.firstName} {contactInfo.lastName}
                </TBody>
              </Stack>
              <Stack direction={"row"} spacing={1}>
                <TBody bold>Phone:</TBody>
                <TBody>{contactInfo.phone}</TBody>
              </Stack>
            </Stack>

            <Stack>
              <Stack direction={"row"} spacing={1}>
                <TBody bold>Service Price:</TBody>
                <TBody>${paymentOptions.servicePrice.toFixed(2)}</TBody>
              </Stack>
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
