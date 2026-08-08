import { Stack } from "@mui/material";
import { THeading } from "../typography";
import { ServiceCard } from "../cards";
import { SERVICE_IMAGES, SERVICE_ROUTES, SERVICES } from "@/interfaces";

type OurServicesProps = {
  bungee?: boolean;
};

export const OurServices = ({ bungee }: OurServicesProps) => {
  const services = SERVICES.map((serv, i) => ({
    service: serv,
    href: SERVICE_ROUTES[i],
    url: SERVICE_IMAGES[i],
  }));

  return (
    <Stack spacing={4} sx={{ alignItems: "center", justifyContent: "start" }}>
      <THeading bungee={bungee} thin>
        Our Services
      </THeading>

      <Stack
        direction={"row"}
        useFlexGap
        sx={{
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "center",

          gap: 2,
          rowGap: 4,
        }}
      >
        {services.map((service) => (
          <Stack key={service.service} sx={{ width: "30%" }}>
            <ServiceCard
              title={service.service}
              href={service.href}
              url={service.url}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
