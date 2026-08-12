import { ServiceAreaColumns, TBody, THeading } from "@/components";
import { useServiceAreas } from "@/hooks";
import { Stack } from "@mui/material";

export const MobileServiceAreas = () => {
  const { full } = useServiceAreas();

  return (
    <Stack sx={{ alignItems: "center" }} spacing={4}>
      <Stack spacing={0} sx={{ alignItems: "center" }}>
        <THeading align="center">Our Mobile Service Areas</THeading>
        <TBody align="center">
          We service anywhere within a 50 mile radius of the following areas
        </TBody>
      </Stack>

      <Stack sx={{ paddingInline: 10, width: "100%" }}>
        <ServiceAreaColumns areas={full} />
      </Stack>
    </Stack>
  );
};
