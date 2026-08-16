import { Stack } from "@mui/material";
import { ServiceAreasColumn } from "./ServiceAreasColumn";
import { useScreenSize, type FullServiceAreasType } from "@/hooks";

export const ServiceAreaColumns = ({
  areas,
}: {
  areas: FullServiceAreasType;
}) => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  return (
    <Stack
      direction={sizeUnder.xs ? "column" : "row"}
      sx={{
        width: "100%",
        paddingInline: sizeUnder.sm ? 2.5 : sizeUnder.md ? 5 : 10,
        alignItems: sizeUnder.xs ? "center" : "start",
        justifyContent: "space-between",
      }}
      spacing={1}
    >
      <ServiceAreasColumn {...areas.NewYork} />
      <ServiceAreasColumn {...areas.SouthCarolina} />
      <ServiceAreasColumn {...areas.Kentucky} />

      <Stack spacing={2}>
        <ServiceAreasColumn {...areas.Massachusetts} />
        <ServiceAreasColumn {...areas.Connecticut} />
      </Stack>

      <ServiceAreasColumn {...areas.Florida} />
    </Stack>
  );
};
