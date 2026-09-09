import {
  BorderButton,
  FullPage,
  IconButton,
  Icons,
  LoadingPage,
  PageHeader,
  TBody,
  TEXT_SIZES,
} from "@/components";
import { CSS, ROUTES } from "@/Constants";
import {
  useAuthImage,
  useDeleteCustomerAttatchment,
  useGetAttatchment,
  useGetCustomerService,
  useGetUserService,
  useScreenSize,
} from "@/hooks";
import { Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router";

export const CustomerAttatchment = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { lessThanEqualTo } = useScreenSize();

  const { customer, loading: customerLoading } = useGetCustomerService({
    customerQuoteId: params.customerQuoteId,
  });
  const { attatchment, loading: attatchmentLoading } = useGetAttatchment({
    attatchmentId: params.attatchmentId,
  });
  const { loading: deleteCustomerLoading, onDeleteCustomerAttatchment } =
    useDeleteCustomerAttatchment();

  const { loading: getUserLoading, user: createdByUser } = useGetUserService({
    userId: attatchment?.createdBy,
  });

  const imageSrc = useAuthImage(attatchment?.attachmentId);

  const loading =
    customerLoading ||
    attatchmentLoading ||
    deleteCustomerLoading ||
    getUserLoading;

  if (loading || !attatchment || !customer || !createdByUser)
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
          paddingBlock: lessThanEqualTo.md ? 6 : 4,
          paddingInline: lessThanEqualTo.xs ? 2 : 8,
          pb: lessThanEqualTo.md ? 2 : undefined,
        }}
        spacing={lessThanEqualTo.xs ? 4 : 4}
      >
        <Stack sx={{ position: "relative", width: "100%" }}>
          <PageHeader
            onGoBack={() => navigate(-1)}
            text="Customer Attatchment"
          />

          {!lessThanEqualTo.xxs && (
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
          )}
        </Stack>

        <Stack sx={{ width: "100%", alignItems: "center" }}>
          <Stack
            sx={{
              width: "90%",
            }}
            spacing={2}
          >
            <Stack
              sx={{
                width: "100%",

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
                src={imageSrc}
                alt={"Image - " + attatchment.attachmentId}
              />
            </Stack>

            <Stack sx={{}}>
              <TBody opacity={0.5}>Added By:</TBody>
              <Stack spacing={-1}>
                <TBody bold large>
                  {`${createdByUser.info.firstName} ${createdByUser.info.lastName}`.trim()}
                </TBody>
                <TBody medium>{`${createdByUser.username}`.trim()}</TBody>
              </Stack>
            </Stack>
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
