import { Stack } from "@mui/material";
import { ServiceAreasColumn } from "./ServiceAreasColumn";
import type { FullServiceAreasType } from "@/hooks";

export const ServiceAreaColumns = ({
  areas,
}: {
  areas: FullServiceAreasType;
}) => {
  return (
    <Stack
      direction={"row"}
      sx={{
        width: "100%",
        paddingInline: 10,
        alignItems: "start",
        justifyContent: "space-between",
      }}
    >
      <ServiceAreasColumn {...areas.NewYork} />
      <ServiceAreasColumn {...areas.SouthCarolina} />
      <ServiceAreasColumn {...areas.Kentucky} />

      <Stack spacing={1}>
        <ServiceAreasColumn {...areas.Massachusetts} />
        <ServiceAreasColumn {...areas.Connecticut} />
      </Stack>

      <ServiceAreasColumn {...areas.Florida} />
    </Stack>
  );
};
