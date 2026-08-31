import { Icons, LabledRowText, LargeSquareIcon, THeading } from "@/components";
import type { ICustomerQuote } from "@/interfaces";
import { capitalize } from "@/utils";
import { Stack } from "@mui/material";

type CustomerPaymentInfoProps = {
  customer: ICustomerQuote;
};

export const CustomerPaymentInfo = ({ customer }: CustomerPaymentInfoProps) => {
  if (!customer.paymentInfo) return null;
  return (
    <Stack direction={"row"} spacing={4} sx={{ alignItems: "start" }}>
      <LargeSquareIcon Icon={Icons.Sales} />

      <Stack spacing={1}>
        <THeading>Payment Information</THeading>

        <LabledRowText
          bold="Price After Tax:"
          text={`$${customer.paymentInfo.serviceAmountAfterTax.toFixed(2)}`}
        />
        <LabledRowText
          bold="Price Before Tax:"
          text={`$${customer.paymentInfo.serviceAmount.toFixed(2)}`}
        />
        <LabledRowText
          bold="Payment Preference:"
          text={capitalize(customer.paymentInfo.type)}
        />
        {customer.paymentInfo.insurance && (
          <Stack spacing={1} sx={{ width: "100%", alignItems: "start" }}>
            <LabledRowText
              bold="Insurance Name:"
              text={customer.paymentInfo.insurance.insuranceName}
            />
            <LabledRowText
              bold="Insurance Policy #:"
              text={customer.paymentInfo.insurance.policyNumber}
            />
            <LabledRowText
              bold="Insurance Coverage:"
              text={
                customer.paymentInfo.insurance.fullCoverage ? `Full` : `Limited`
              }
            />
            <LabledRowText
              bold="Insurance Coverage Amount:"
              text={`$${customer.paymentInfo.insurance.coverageAmount.toFixed(2)}`}
            />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
