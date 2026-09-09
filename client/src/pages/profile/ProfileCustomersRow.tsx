import {
  BorderButton,
  CustomerCardSmall,
  NoDataFound,
  THeading,
} from "@/components";
import { useScreenSize } from "@/hooks";
import type { ICustomerQuote } from "@/interfaces";
import { Link, Stack } from "@mui/material";

type ProfileCustomersRowProps = {
  title: string;
  quotes: ICustomerQuote[];
  href?: string;
  noDataMessage?: string;
};

export const ProfileCustomersRow = ({
  quotes,
  title,
  href,
  noDataMessage,
}: ProfileCustomersRowProps) => {
  const { lessThanEqualTo } = useScreenSize();
  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stack
        direction={lessThanEqualTo.xs ? "column" : "row"}
        sx={{
          width: "100%",
          alignItems: "end",
          justifyContent: "space-between",
        }}
      >
        <Stack sx={{ width: lessThanEqualTo.xs ? "100%" : undefined }}>
          <THeading bungeeFill>{title}</THeading>
        </Stack>

        {href && (
          <Link href={href}>
            <BorderButton color="blue">View All</BorderButton>
          </Link>
        )}
      </Stack>

      <Stack
        direction={"row"}
        spacing={4}
        sx={{ width: "100%", overflowX: "scroll", pb: 4 }}
      >
        {quotes.length === 0 ? (
          <NoDataFound message={noDataMessage} />
        ) : (
          quotes.map((customer, i) => (
            <CustomerCardSmall key={i} quote={customer} />
          ))
        )}
      </Stack>
    </Stack>
  );
};
