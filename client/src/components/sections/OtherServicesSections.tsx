import { Link, Stack } from "@mui/material";
import { THeading } from "../typography";
import { BorderButton } from "../buttons";
import { Icons } from "../icons";
import { SERVICE_IMAGES, SERVICE_ROUTES, SERVICES } from "@/interfaces";
import { ServiceCard } from "../cards";
import { ROUTES } from "@/Constants";

type OtherServicesSectionsProps = {
  WR?: boolean;
  AG?: boolean;
  ADAS?: boolean;
  MB?: boolean;
  CC?: boolean;
};

export const OtherServicesSections = ({
  WR,
  AG,
  ADAS,
  MB,
  CC,
}: OtherServicesSectionsProps) => {
  const services = SERVICES.map((serv, i) => ({
    service: serv,
    href: SERVICE_ROUTES[i],
    url: SERVICE_IMAGES[i],
  }));
  return (
    <Stack sx={{ paddingInline: 10, pb: 8 }}>
      <Stack
        direction={"row"}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <THeading>Other Services</THeading>

        <Link href={ROUTES.SERVICES}>
          <BorderButton color="blue">
            <Stack direction={"row"}>
              <span>View all services</span>
              <Icons.ChevronRight />
            </Stack>
          </BorderButton>
        </Link>
      </Stack>

      <Stack
        direction={"row"}
        sx={{
          overflowX: "hidden",
          alignItems: "center",
          justifyContent: "center",
          paddingBlock: 4,
        }}
        spacing={4}
      >
        {WR && <QuickServiceComponent {...services[0]} />}
        {AG && <QuickServiceComponent {...services[1]} />}
        {ADAS && <QuickServiceComponent {...services[2]} />}
        {CC && <QuickServiceComponent {...services[3]} />}
        {MB && <QuickServiceComponent {...services[4]} />}
      </Stack>
    </Stack>
  );
};

const QuickServiceComponent = ({
  service,
  href,
  url,
}: {
  service: string;
  href: string;
  url: string;
}) => {
  return (
    <Stack sx={{ width: "30%" }}>
      <ServiceCard title={service} href={href} url={url} />
    </Stack>
  );
};
