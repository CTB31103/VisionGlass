import { Divider, FullPage, LoadingPage, PageHeader } from "@/components";
import { useApi, useTimeoutEffect } from "@/hooks";
import { type ICustomerQuote, type IUser } from "@/interfaces";
import { toString } from "@/utils";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CustomerInfo } from "./CustomerInfo";
import { CustomerVehicleInfo } from "./CustomerVehicleInfo";
import { CustomerPaymentInfo } from "./CustomerPaymentInfo";
import { CustomerMembers } from "./CustomerMembers";
import { CustomerDocuments } from "./CustomerDocuments";
import { WarningModal } from "./WarningModal";
import { ROUTES } from "@/Constants";
import { useUserStore } from "@/stores";

export const Customer = () => {
  const params = useParams();
  // const navigate = useNavigate();

  const user = useUserStore((state) => state.user);

  const {
    snackbar: [_, errorSnack],
    customerQuoteRoutes,
    userRoutes,
  } = useApi();

  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [memberLoading, setMemberLoading] = useState(false);
  const [customer, setCustomer] = useState<ICustomerQuote | undefined>(
    undefined,
  );
  const [teamMembers, setTeamMembers] = useState<IUser[]>([]);
  const [notes, setNotes] = useState("");

  const [showDoneWarning, setShowDoneWarning] = useState(false);
  const [showQuotedWarning, setShowQuotedWarning] = useState(false);
  const [showScheduledWarning, setShowScheduledWarning] = useState(false);

  const getCustomer = async (customerId: string) => {
    setLoading(true);

    const res = await customerQuoteRoutes.getCustomer(customerId);
    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    setCustomer(res.data.customer);
  };

  const getTeamMembers = async (customer: ICustomerQuote) => {
    setLoading(true);

    const res = await userRoutes.getUsers(customer.teamMembers);

    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    setTeamMembers(res.data.users);
  };

  useTimeoutEffect(
    () => {
      if (!params.customerQuoteId) return;
      (async () => {
        await getCustomer(params.customerQuoteId as string);
      })();
    },
    [toString(params)],
    50,
  );

  useEffect(() => {
    setNotes(customer?.notes ?? "");
  }, [customer?.notes]);

  useEffect(() => {
    if (customer && customer.teamMembers.length > 0) getTeamMembers(customer);
    else setTeamMembers([]);
  }, [toString(customer?.teamMembers)]);

  const updateCustomerStatus = async (
    customer: ICustomerQuote,
    status: ICustomerQuote["status"],
  ) => {
    setLoading(true);

    const res = await customerQuoteRoutes.editStatus(customer, status);
    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    setCustomer(res.data.customer);
  };

  const onMarkCustomer = (customer: ICustomerQuote) => {
    if (customer.status === "done") return;

    if (customer.status === "scheduled" && customer.meetingTime) {
      const td = new Date();

      if (td.getTime() < customer.meetingTime.from) {
        return setShowDoneWarning(true);
      }

      updateCustomerStatus(customer, "done");
    }

    if (customer.status === "new") {
      if (
        !customer.paymentInfo ||
        customer.paymentInfo.serviceAmount === 0 ||
        !customer.car
      ) {
        return setShowQuotedWarning(true);
      }

      // Should never get to this point, upon editing from above missing fields status should auto update.
      updateCustomerStatus(customer, "quoted");
    }

    if (
      customer.status === "insurance_validated" ||
      customer.status === "quoted"
    ) {
      if (!customer.meetingTime || !customer.address) {
        return setShowScheduledWarning(true);
      }

      // Should never get to this point, upon editing from above missing fields status should auto update.
      updateCustomerStatus(customer, "scheduled");
    }
  };

  const onSaveNotes = async (customer: ICustomerQuote) => {
    setSaveLoading(true);

    const res = await customerQuoteRoutes.editNotes(customer, notes);
    setSaveLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    setCustomer(res.data.customer);
  };

  const toggleTeamMember = async (customer: ICustomerQuote) => {
    setMemberLoading(true);

    const res = await customerQuoteRoutes.toggleTeamMember(
      customer.customerQuoteId,
      user.userId,
    );
    setMemberLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    setCustomer(res.data.customer);
  };

  if (loading || !customer) return <LoadingPage />;

  return (
    <FullPage screen>
      <Stack
        sx={{ width: "100%", paddingBlock: 4, paddingInline: 8 }}
        spacing={4}
      >
        <PageHeader backHref={ROUTES.CUSTOMERS} text="Customer" />

        <CustomerInfo
          customer={customer}
          notes={notes}
          setNotes={setNotes}
          loading={saveLoading}
          disableSave={customer.notes === notes}
          onMark={() => onMarkCustomer(customer)}
          onSave={() => onSaveNotes(customer)}
        />

        <Divider />

        <CustomerVehicleInfo customer={customer} />

        <Divider />

        {customer.paymentInfo && (
          <Stack spacing={4} sx={{ width: "100%" }}>
            <CustomerPaymentInfo customer={customer} />

            <Divider />
          </Stack>
        )}

        <CustomerMembers
          teamMemberIds={customer.teamMembers}
          teamMembers={teamMembers}
          loading={memberLoading}
          onActionBtn={() => toggleTeamMember(customer)}
        />

        <Divider />

        <CustomerDocuments />

        <Divider />

        <WarningModal
          open={showDoneWarning}
          subtitle="Cannot mark as done before meeting start time. Would you like to update the meeting time?"
          href={ROUTES.CUSTOMERS_EDIT + `/${customer.customerQuoteId}`}
          onClose={() => setShowDoneWarning(false)}
        />

        <WarningModal
          open={showQuotedWarning}
          subtitle="Cannot mark as quoted without a service price and basic car information. Would you like to update this information now?"
          href={ROUTES.CUSTOMERS_EDIT + `/${customer.customerQuoteId}`}
          onClose={() => setShowQuotedWarning(false)}
        />

        <WarningModal
          open={showScheduledWarning}
          subtitle="Cannot mark as scheduled without a meeting time and car location. Would you like to update this information now?"
          href={ROUTES.CUSTOMERS_EDIT + `/${customer.customerQuoteId}`}
          onClose={() => setShowScheduledWarning(false)}
        />
      </Stack>
    </FullPage>
  );
};
