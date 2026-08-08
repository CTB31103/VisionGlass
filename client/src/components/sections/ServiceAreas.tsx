import { Link, Stack } from "@mui/material";
import { TBody, THeading } from "../typography";
import { ActionButton } from "../buttons";
import { ServiceAreasColumn } from "./ServiceAreasColumn";
import { ROUTES } from "@/Constants";

export const ServiceAreas = () => {
  return (
    <Stack
      spacing={2}
      sx={{ paddingInline: 10, paddingBlock: 3, justifyContent: "center" }}
    >
      <Stack
        direction={"row"}
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack>
          <THeading>Service Areas</THeading>
          <TBody>
            We service anywhere within a 50 mile radius of the following areas
          </TBody>
        </Stack>

        <Link
          href={ROUTES.SERVICE_AREAS}
          variant="inherit"
          sx={{ outline: "none" }}
          underline="none"
        >
          <ActionButton color="red">See All Areas</ActionButton>
        </Link>
      </Stack>

      <Stack
        direction={"row"}
        sx={{
          paddingInline: 10,
          alignItems: "start",
          justifyContent: "space-between",
        }}
      >
        <ServiceAreasColumn
          title="New York"
          items={["Buffalo, NY", "Syracuse, NY", "Albany, NY"]}
          viewMore
        />
        <ServiceAreasColumn
          title="South Carolina"
          items={["Columbia, SC", "Charleston, SC"]}
        />
        <ServiceAreasColumn
          title="Kentucky"
          items={["Louisville, KY", "Lexington, KY"]}
        />

        <Stack
          spacing={1}
          // sx={{ alignItems: "start", justifyContent: "space-between" }}
        >
          <ServiceAreasColumn
            title="Massachusetts"
            items={["Springfield, MA"]}
          />
          <ServiceAreasColumn
            title="Connecticut"
            items={["Windsor Locks, CT"]}
          />
        </Stack>

        <ServiceAreasColumn
          title="Florida"
          items={["Orlando, FL", "Tampa, FL", "West Palm Beach, FL"]}
          viewMore
        />
      </Stack>

      <TBody align="center">
        Are you nearby one of these areas or in an area not listed above?
        <br />
        Give our Sales phone number a call and lets talk!
      </TBody>
    </Stack>
  );
};
