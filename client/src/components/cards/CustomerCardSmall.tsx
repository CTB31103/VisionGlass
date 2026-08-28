import { CSS, ROUTES } from "@/Constants";
import { useDimensions } from "@/hooks";
import type { ICustomerQuote } from "@/interfaces";
import { Link, Stack } from "@mui/material";
import { Icons } from "../icons";
import { TBody, TEXT_SIZES } from "../typography";
import { QuoteStatusCircle } from "../sections";

type CustomerCardSmallProps = {
  quote: ICustomerQuote;
};

export const CustomerCardSmall = ({ quote }: CustomerCardSmallProps) => {
  const [squareRef, squareDims] = useDimensions();
  const fullname =
    `${quote.customer.firstName} ${quote.customer.lastName}`.trim();

  return (
    <Stack
      ref={squareRef}
      sx={{
        minWidth: 250,
        height: squareDims.width,
      }}
    >
      <Link
        href={ROUTES.CUSTOMERS + `/${quote.customerQuoteId}`}
        color="inherit"
        underline="none"
      >
        <Stack
          sx={{
            width: "100%",
            height: "100%",

            borderRadius: 5,
            borderWidth: 1,
            borderColor: CSS.colors.black,

            p: 2,

            alignItems: "center",
            justifyContent: "center",

            "&:hover": {
              borderWidth: 2,
              borderColor: CSS.colors.blue,
              color: CSS.colors.blue,
            },
          }}
        >
          <Stack spacing={2} sx={{ width: "100%", alignItems: "center" }}>
            <Icons.User sx={{ fontSize: TEXT_SIZES.largest * 1.5 }} />
            <TBody bold medium>
              {fullname}
            </TBody>
            <QuoteStatusCircle status={quote.status} />
          </Stack>
        </Stack>
      </Link>
    </Stack>
  );
};
