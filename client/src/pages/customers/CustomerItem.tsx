import {
  Divider,
  Icons,
  MyChip,
  QuoteStatusCircle,
  THeading,
} from "@/components";
import { CSS } from "@/Constants";

import { UserType, type CustomerQuoteStatus, type IUser } from "@/interfaces";
import { Link, Stack } from "@mui/material";

type CustomerItemProps = {
  title: string;
  status: CustomerQuoteStatus;
  href?: string;
  employees?: IUser[];
  divider?: boolean;
  onClick?: () => void;
};

export const CustomerItem = ({
  title,
  status,
  href,
  employees,
  divider,
  onClick,
}: CustomerItemProps) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Link
        sx={{ width: "100%" }}
        href={href}
        variant="inherit"
        underline="none"
      >
        <Stack
          sx={{
            width: "100%",
            cursor: "pointer",
            justifyContent: "space-between",
            color: CSS.colors.black,

            "&:hover": {
              color: CSS.colors.blue,
            },
          }}
          direction={"row"}
          onClick={onClick}
        >
          <Stack spacing={1}>
            <THeading bold>{title}</THeading>
            <QuoteStatusCircle status={status} />
            {employees && (
              <Stack direction={"row"} spacing={1}>
                {employees.map((employee, i) => (
                  <MyChip
                    key={i}
                    Icon={
                      employee.userType === UserType.TECH
                        ? Icons.Tools
                        : Icons.Sales
                    }
                    text={`${employee.info.firstName} ${employee.info.lastName}`}
                  />
                ))}
              </Stack>
            )}
          </Stack>

          <Stack sx={{ justifyContent: "center" }}>
            <Icons.ChevronRight />
          </Stack>
        </Stack>
      </Link>

      {divider && <Divider />}
    </Stack>
  );
};
