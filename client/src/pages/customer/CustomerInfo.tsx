import {
  ActionButton,
  EditDeleteButtons,
  LabledRowText,
  LargeUserImage,
  QuoteStatusCircle,
  TBody,
  TextInput,
  THeading,
} from "@/components";
import { ROUTES } from "@/Constants";
import type { ISetState } from "@/hooks";
import { CustomerQuoteStatus, type ICustomerQuote } from "@/interfaces";
import { toReadableDate, toTimeString } from "@/utils";
import { Link, Stack } from "@mui/material";

type CustomerInfoProps = {
  customer: ICustomerQuote;

  notes: string;
  setNotes: ISetState<string>;

  loading?: boolean;
  disableSave?: boolean;
  onSave?: () => void;

  markHref?: string;
  onMark?: () => void;
};

export const CustomerInfo = ({
  customer,
  notes,
  setNotes,
  disableSave,
  loading,
  onSave,
  markHref,
  onMark,
}: CustomerInfoProps) => {
  const hasEmail = customer.customer.email.length > 0;
  const hasPhone = customer.customer.phone.length > 0;

  const markingBtnText = {
    new: `Mark quoted`,
    quoted: `Mark scheduled`,
    insurance_validated: `Mark scheduled`,
    scheduled: `Mark done`,
    done: ``,
  };

  return (
    <Stack
      direction={"row"}
      spacing={4}
      sx={{ alignItems: "start", position: "relative" }}
    >
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <LargeUserImage />

        {customer.status !== CustomerQuoteStatus.DONE && (
          <Link color="inherit" underline="none" href={markHref}>
            <ActionButton loading={loading} color="red" onClick={onMark}>
              {markingBtnText[customer.status]}
            </ActionButton>
          </Link>
        )}
      </Stack>

      <Stack spacing={2} sx={{ alignItems: "start", width: "100%" }}>
        <Stack spacing={0} sx={{ width: "100%", alignItems: "start" }}>
          <THeading>
            {customer.customer.firstName} {customer.customer.lastName}
          </THeading>
          {(customer.status === CustomerQuoteStatus.SCHEDULED ||
            customer.status === CustomerQuoteStatus.DONE) &&
            customer.meetingTime && (
              <LabledRowText
                allBold={customer.status === CustomerQuoteStatus.SCHEDULED}
                bold={
                  customer.status === CustomerQuoteStatus.DONE
                    ? `Service Completed On:`
                    : "Meeting Time:"
                }
                text={`${toReadableDate(new Date(customer.meetingTime.from))} -  ${toTimeString(new Date(customer.meetingTime.to))}`}
              />
            )}
          {customer.callbackTime && (
            <LabledRowText
              bold="Requested Callback Time:"
              text={
                customer.callbackTime.asap
                  ? `ASAP`
                  : `${customer.callbackTime.dayPrefrence.join(", ")} ${customer.callbackTime.timePreference ? `between ${toTimeString(new Date(customer.callbackTime.timePreference.from))} - ${toTimeString(new Date(customer.callbackTime.timePreference.to))}` : ""}`
              }
            />
          )}
          {hasEmail && <TBody medium>{customer.customer.email}</TBody>}
          {hasPhone && <TBody medium>{customer.customer.phone}</TBody>}

          <QuoteStatusCircle status={customer.status} />
        </Stack>

        <TextInput
          label="Notes:"
          value={notes}
          setValue={setNotes}
          multiline
          rows={3}
        />
        <Stack direction={"row"} sx={{ width: "100%", justifyContent: "end" }}>
          <ActionButton onClick={onSave} disabled={disableSave} color="red">
            Save
          </ActionButton>
        </Stack>
      </Stack>

      <Stack sx={{ position: "absolute", top: 0, right: 0 }}>
        <EditDeleteButtons
          editHref={ROUTES.CUSTOMERS_EDIT + `/${customer.customerQuoteId}`}
        />
      </Stack>
    </Stack>
  );
};
