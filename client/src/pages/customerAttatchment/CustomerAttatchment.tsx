import {
  BorderButton,
  FullPage,
  IconButton,
  Icons,
  LoadingPage,
  PageHeader,
  TEXT_SIZES,
} from "@/components";
import { CONSTANTS, CSS, ROUTES } from "@/Constants";
import {
  useDeleteCustomerAttatchment,
  useGetAttatchment,
  useGetCustomerService,
} from "@/hooks";
import { Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router";

export const CustomerAttatchment = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { customer, loading: customerLoading } = useGetCustomerService({
    customerQuoteId: params.customerQuoteId,
  });
  const { attatchment, loading: attatchmentLoading } = useGetAttatchment({
    attatchmentId: params.attatchmentId,
  });
  const { loading: deleteCustomerLoading, onDeleteCustomerAttatchment } =
    useDeleteCustomerAttatchment();

  if (
    customerLoading ||
    attatchmentLoading ||
    deleteCustomerLoading ||
    !attatchment ||
    !customer
  )
    return <LoadingPage />;

  const onDelete = () =>
    onDeleteCustomerAttatchment(
      customer.customerQuoteId,
      attatchment.attachmentId,
      (cust) =>
        navigate(ROUTES.CUSTOMER(cust.customerQuoteId), {
          replace: true,
        }),
    );

  return (
    <FullPage screen>
      <Stack
        sx={{
          width: "100%",
          paddingBlock: 4,
          paddingInline: 8,
        }}
        spacing={4}
      >
        <Stack sx={{ position: "relative", width: "100%" }}>
          <PageHeader
            onGoBack={() => navigate(-1)}
            text="Customer Attatchment"
          />

          <Stack
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              height: "100%",
              justifyContent: "center",
            }}
          >
            <IconButton
              onClick={onDelete}
              bgcolor={CSS.colors.white}
              borderColor={CSS.colors.red}
              color={CSS.colors.red}
              fontSize={TEXT_SIZES.large}
              Icon={Icons.Delete}
            />
          </Stack>
        </Stack>

        <Stack sx={{ width: "100%", alignItems: "center" }}>
          <Stack
            sx={{
              width: "90%",

              borderRadius: 5,
              borderWidth: 2,
              borderColor: CSS.colors.black,

              overflow: "hidden",

              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{ width: "100%", objectFit: "cover" }}
              src={CONSTANTS.api.image(attatchment.attachmentId)}
              alt={"Image - " + attatchment.attachmentId}
            />
          </Stack>
        </Stack>

        <Stack sx={{ width: "100%", alignItems: "center" }}>
          <BorderButton onClick={onDelete} color="red">
            Delete Attatchment <Icons.Delete />
          </BorderButton>
        </Stack>
      </Stack>
    </FullPage>
  );
};
