import { Link, Stack } from "@mui/material";
import { TBody, THeading } from "../typography";
import { ActionButton } from "../buttons";
import { ROUTES } from "@/Constants";
import { useScreenSize, useServiceAreas } from "@/hooks";
import { ServiceAreaColumns } from "./ServiceAreaColumns";

export const ServiceAreas = () => {
  const { short } = useServiceAreas();
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  return (
    <Stack
      spacing={2}
      sx={{
        paddingInline: sizeUnder.sm ? 2.5 : sizeUnder.md ? 5 : 10,
        paddingBlock: 3,
        justifyContent: "center",
      }}
    >
      <Stack
        direction={sizeUnder.sm ? "column" : "row"}
        sx={{
          width: "100%",
          alignItems: sizeUnder.sm ? "start" : "center",
          justifyContent: sizeUnder.sm ? undefined : "space-between",
        }}
        spacing={sizeUnder.sm ? 1 : undefined}
      >
        <Stack>
          <THeading>Service Areas</THeading>
          <TBody>
            We service anywhere within a 50 mile radius of the following areas
          </TBody>
        </Stack>

        {/* <Stack> */}
        <Link
          href={ROUTES.CONTACT}
          variant="inherit"
          sx={{ outline: "none", width: sizeUnder.xs ? "100%" : undefined }}
          underline="none"
        >
          <ActionButton fullWidth={sizeUnder.xs} color="red">
            See All Areas
          </ActionButton>
        </Link>
        {/* </Stack> */}
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
