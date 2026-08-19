import { RadioInput, TextInput, NumberInput } from "@/components";
import {
  useScreenSize,
  type UseCreateCustomerQuoteServiceResponse,
} from "@/hooks";
import { Stack } from "@mui/material";

type PaymentOptionsProps = {
  state: UseCreateCustomerQuoteServiceResponse["paymentOptions"];
  fullForm?: boolean;
};

export const PaymentOptions = ({
  state: {
    payWithInsurance,
    setPayWithInsurance,
    insuranceName,
    setInsuranceName,
    policyNumber,
    setPolicyNumber,
    insuranceContacted,
    setInsuranceContacted,
    insuranceAccepted,
    setInsuranceAccepted,
    fullCoverage,
    setFullCoverage,
    insuranceAmount,
    setInsuranceAmount,
    afterTaxPrice,
    setAfterTaxPrice,
    servicePrice,
    setServicePrice,
  },
  fullForm,
}: PaymentOptionsProps) => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  return (
    <Stack spacing={2}>
      <Stack direction={sizeUnder.xs ? "column" : "row"} spacing={2}>
        <RadioInput
          required
          label="I'll pay with"
          boxLabel="Out of pocket"
          checked={!payWithInsurance}
          onClick={() => setPayWithInsurance(false)}
        />
        <RadioInput
          required
          label="I'll pay with"
          boxLabel="Insurance"
          checked={payWithInsurance}
          onClick={() => setPayWithInsurance(true)}
        />
      </Stack>

      {fullForm && (
        <Stack direction={sizeUnder.xs ? "column" : "row"} spacing={2}>
          <NumberInput
            label="Service Amount - Before Tax:"
            value={servicePrice}
            setValue={setServicePrice}
            optional={!insuranceContacted}
            required={insuranceContacted}
          />

          <NumberInput
            label="Service Amount - After Tax:"
            value={afterTaxPrice}
            setValue={setAfterTaxPrice}
            optional={!insuranceContacted}
            required={insuranceContacted}
          />
        </Stack>
      )}

      {payWithInsurance && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Stack direction={sizeUnder.xs ? "column" : "row"} spacing={2}>
            <TextInput
              label="Insurance Company Name:"
              value={insuranceName}
              setValue={setInsuranceName}
              optional={!insuranceContacted}
              required={insuranceContacted}
            />
            <TextInput
              label="Insurance Policy #:"
              value={policyNumber}
              setValue={setPolicyNumber}
              optional={!insuranceContacted}
              required={insuranceContacted}
            />
          </Stack>

          {fullForm && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Stack
                sx={{ width: "100%" }}
                direction={sizeUnder.xs ? "column" : "row"}
                spacing={2}
              >
                <RadioInput
                  label="Contacted:"
                  boxLabel="Insurance Contacted"
                  checked={insuranceContacted}
                  onClick={() =>
                    setInsuranceContacted((prev) => {
                      if (prev) setInsuranceAccepted(false);
                      return !prev;
                    })
                  }
                />

                {insuranceContacted ? (
                  <RadioInput
                    label="Accepted:"
                    boxLabel="Insurance Accepted"
                    checked={insuranceAccepted}
                    onClick={() => setInsuranceAccepted((prev) => !prev)}
                  />
                ) : (
                  <Stack sx={{ width: "100%" }} />
                )}
              </Stack>

              {insuranceAccepted && (
                <Stack
                  sx={{ width: "100%" }}
                  direction={sizeUnder.xs ? "column" : "row"}
                  spacing={2}
                >
                  <RadioInput
                    label="Full Coverage:"
                    boxLabel="Insurance will cover full amount"
                    checked={fullCoverage}
                    onClick={() => setFullCoverage((prev) => !prev)}
                  />

                  <NumberInput
                    label="Insurance Amount:"
                    value={insuranceAmount}
                    setValue={setInsuranceAmount}
                    optional
                  />
                </Stack>
              )}
            </Stack>
          )}
        </Stack>
      )}
    </Stack>
  );
};
