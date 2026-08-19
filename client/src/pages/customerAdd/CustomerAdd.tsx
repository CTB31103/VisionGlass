import {
  ActionButton,
  CustomerQuoteForms,
  FullPage,
  PageHeader,
  TitleWithSubtitle,
} from "@/components";
import { useCreateCustomerQuoteService } from "@/hooks";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router";

export const CustomerAdd = () => {
  const navigate = useNavigate();

  const { contactInfo, carInfo, carDamage, paymentOptions } =
    useCreateCustomerQuoteService();

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

          <Stack
            sx={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActionButton onClick={() => {}} color="red">
              Create Customer
            </ActionButton>
          </Stack>
        </Stack>
      </Stack>
    </FullPage>
  );
};
