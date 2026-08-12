import { Link, Stack } from "@mui/material";
import { TBody, THeading } from "../typography";
import { ActionButton } from "../buttons";
import { ROUTES } from "@/Constants";
import { useServiceAreas } from "@/hooks";
import { ServiceAreaColumns } from "./ServiceAreaColumns";

export const ServiceAreas = () => {
  const { short } = useServiceAreas();
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
          href={ROUTES.CONTACT}
          variant="inherit"
          sx={{ outline: "none" }}
          underline="none"
        >
          <ActionButton color="red">See All Areas</ActionButton>
        </Link>
      </Stack>

      <ServiceAreaColumns areas={short} />

      <TBody align="center">
        Are you nearby one of these areas or in an area not listed above?
        <br />
        Give our Sales phone number a call and lets talk!
      </TBody>
    </Stack>
  );
};
