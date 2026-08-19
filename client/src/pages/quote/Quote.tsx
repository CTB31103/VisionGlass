import {
  ActionButton,
  CustomerQuoteForms,
  FullPage,
  TitleWithSubtitle,
} from "@/components";
import { useCreateCustomerQuoteService, useScreenSize } from "@/hooks";
import { Stack } from "@mui/material";

export const Quote = () => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();

  const { contactInfo, carInfo, carDamage, paymentOptions, callbackInfo } =
    useCreateCustomerQuoteService();

  return (
    <FullPage screen>
      <Stack
        spacing={4}
        sx={{
          paddingBlock: sizeUnder.xs
            ? 1.25
            : sizeUnder.sm
              ? 2.5
              : sizeUnder.md
                ? 5
                : 10,
          paddingInline: sizeUnder.xs
            ? 2.5
            : sizeUnder.sm
              ? 5
              : sizeUnder.md
                ? 10
                : 20,
        }}
      >
        <TitleWithSubtitle
          title="Request a callback"
          subtitle="Fill out this quick form and Vision Glass will call you back by the next day. All inputs marked with * are required."
        />

        <CustomerQuoteForms.ContactInfo tellUsMoreRadio state={contactInfo} />

        {contactInfo.tellUsMore && (
          <Stack spacing={4}>
            <TitleWithSubtitle
              title="Vehicle Information"
              subtitle="Share some essential information about your ride to assist us in getting it fixed right."
            />

            <CustomerQuoteForms.CarInfo tellUsMoreRadio state={carInfo} />

            {carInfo.shareDamage && (
              <Stack spacing={4}>
                <TitleWithSubtitle
                  title="Vehicle Damage"
                  subtitle="Tell us where the damage is to ensure accurate assessment and quote."
                />

                <CustomerQuoteForms.CarDamage state={carDamage} />
              </Stack>
            )}

            <TitleWithSubtitle
              title="Payment Options"
              subtitle="Let us know how you want to pay, through insurance or out-of-pocket, we'll work with you or your insurance to get you the most affordable price."
            />

            <CustomerQuoteForms.PaymentOptions state={paymentOptions} />
          </Stack>
        )}

        <TitleWithSubtitle
          title="Callback Time"
          subtitle="We'll give you a call back as soon as we can within 24 hours of receiving your request, or between a time that works for you!"
        />

        <CustomerQuoteForms.CallbackInfo state={callbackInfo} />

        <Stack
          sx={{
            pt: sizeUnder.xs ? 0 : 4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActionButton color="red">Request Quote</ActionButton>
        </Stack>
      </Stack>
    </FullPage>
  );
};
