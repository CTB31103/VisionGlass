import {
  ActionButton,
  BasicModal,
  Divider,
  FullPage,
  Icons,
  LoadingPage,
  PageHeader,
} from "@/components";
import {
  useApi,
  useDeleteCustomerAttatchment,
  useGetCustomerService,
  useScreenSize,
} from "@/hooks";
import {
  type IAttatchment,
  type ICustomerQuote,
  type IUser,
} from "@/interfaces";
import { toString } from "@/utils";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
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
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);

  const {
    snackbar: [_, errorSnack],
    customerQuoteRoutes,
    userRoutes,
    attatchmentRoutes,
  } = useApi();

  const { lessThanEqualTo } = useScreenSize();

  const {
    customer,
    setCustomer,
    loading: customerLoading,
  } = useGetCustomerService({ customerQuoteId: params.customerQuoteId });
  const { loading: deleteCustomerLoading, onDeleteCustomerAttatchment } =
    useDeleteCustomerAttatchment();

  const [stateLoading, setStateLoading] = useState(false);
  const [documentsLoading, setDocumentsLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [memberLoading, setMemberLoading] = useState(false);

  const [teamMembers, setTeamMembers] = useState<IUser[]>([]);
  const [attatchments, setAttatchments] = useState<IAttatchment[]>([]);
  const [notes, setNotes] = useState("");

  const [showDoneWarning, setShowDoneWarning] = useState(false);
  const [showQuotedWarning, setShowQuotedWarning] = useState(false);
  const [showScheduledWarning, setShowScheduledWarning] = useState(false);
  const [showLeaveTeamWarning, setShowLeaveTeamWarning] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const [disableLeaveTeam, setDisableLeaveTeam] = useState(false);

  const loading = stateLoading || customerLoading;

  const getTeamMembers = async (customer: ICustomerQuote) => {
    setStateLoading(true);

    const res = await userRoutes.getUsers(customer.teamMembers);

    setStateLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    setTeamMembers(res.data.users);
  };

  const getAttatchments = async (customer: ICustomerQuote) => {
    setStateLoading(true);

    const res = await attatchmentRoutes.getAttatchments({
      attatchmentIds: customer.attatchments.map(
        (attatch) => attatch.attatchmentId,
      ),
    });
    setStateLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    setAttatchments(res.data.attatchments);
  };

  useEffect(() => {
    setNotes(customer?.notes ?? "");
  }, [customer?.notes]);

  useEffect(() => {
    if (customer && customer.teamMembers.length > 0) getTeamMembers(customer);
    else setTeamMembers([]);
  }, [toString(customer?.teamMembers)]);

  useEffect(() => {
    if (customer && customer.attatchments.length > 0) getAttatchments(customer);
    else setAttatchments([]);
  }, [toString(customer?.attatchments)]);

  useEffect(() => {
    setDisableLeaveTeam(
      (customer?.attatchments ?? [])
        .map((attatch) => attatch.userId)
        .includes(user.userId),
    );
  }, [toString(customer?.attatchments), user.userId]);

  const updateCustomerStatus = async (
    customer: ICustomerQuote,
    status: ICustomerQuote["status"],
  ) => {
    setStateLoading(true);

    const res = await customerQuoteRoutes.editStatus(customer, status);
    setStateLoading(false);

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

  const onAddDocumentIds = async (
    customer: ICustomerQuote,
    attatchmentIds: string[],
  ) => {
    setDocumentsLoading(true);

    const res = await customerQuoteRoutes.toggleAttatchments(
      customer.customerQuoteId,
      { attatchmentIds },
    );
    setDocumentsLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    setCustomer(res.data.customer);
  };

  const onDeleteCustomer = async (customer: ICustomerQuote) => {
    setStateLoading(true);

    const res = await customerQuoteRoutes.deleteCustomer(
      customer.customerQuoteId,
    );
    setStateLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    navigate(ROUTES.CUSTOMERS);
  };

  if (loading || deleteCustomerLoading || !customer) return <LoadingPage />;

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
        <PageHeader backHref={ROUTES.CUSTOMERS} text="Customer" />

        <CustomerInfo
          customer={customer}
          notes={notes}
          setNotes={setNotes}
          loading={saveLoading}
          disableSave={customer.notes === notes}
          onMark={() => onMarkCustomer(customer)}
          onSave={() => onSaveNotes(customer)}
          onDelete={() => setShowDeleteWarning(true)}
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
          onActionBtn={() =>
            disableLeaveTeam
              ? setShowLeaveTeamWarning(true)
              : toggleTeamMember(customer)
          }
        />

        <Divider />

        <CustomerDocuments
          customerId={customer.customerQuoteId}
          loading={documentsLoading}
          attatchments={attatchments}
          users={teamMembers}
          onAddDocumentIds={(docIds) => onAddDocumentIds(customer, docIds)}
          onDeleteDocument={(docId) =>
            onDeleteCustomerAttatchment(
              customer.customerQuoteId,
              docId,
              (cust) => setCustomer(cust),
            )
          }
        />

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

        <WarningModal
          open={showDeleteWarning}
          subtitle="Deleting this customer will delete all attatchments and dashboard events related to this customer. This action cannot be reveresed. Are you sure you want to continue?"
          UpdateIcon={Icons.Delete}
          updateText="Delete"
          onClose={() => setShowDeleteWarning(false)}
          onUpdate={() => onDeleteCustomer(customer)}
        />

        <BasicModal
          centerSubtitle
          open={showLeaveTeamWarning}
          shrinkHeight
          title="Warning"
          subtitle={
            "Cannot leave this customer's team members while there are attatchments created by your profile for this customer. Please delete all created attatchments to leave this customer's team members."
          }
        >
          <Stack sx={{ width: "100%", alignItems: "center" }}>
            <ActionButton
              color="red"
              onClick={() => setShowLeaveTeamWarning(false)}
            >
              Okay
            </ActionButton>
          </Stack>
        </BasicModal>
      </Stack>
    </FullPage>
  );
};
