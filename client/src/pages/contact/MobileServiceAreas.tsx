import { ServiceAreaColumns, TBody, THeading } from "@/components";
import { useScreenSize, useServiceAreas } from "@/hooks";
import { Stack } from "@mui/material";

export const MobileServiceAreas = () => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  const { full } = useServiceAreas();

  return (
    <Stack
      sx={{
        alignItems: "center",
        pt: sizeUnder.xs ? 4 : sizeUnder.md ? 8 : undefined,
      }}
      spacing={4}
    >
      <Stack spacing={0} sx={{ alignItems: "center" }}>
        <THeading align="center">Our Mobile Service Areas</THeading>
        <TBody align="center">
          We service anywhere within a 50 mile radius of the following areas
        </TBody>
      </Stack>

      <Stack sx={{ paddingInline: sizeUnder.md ? 2.5 : 10, width: "100%" }}>
        <ServiceAreaColumns areas={full} />
      </Stack>
    </Stack>
  );
};
