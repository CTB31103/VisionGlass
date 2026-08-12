import { Link, Stack } from "@mui/material";
import { TBody } from "../typography";
import { ROUTES } from "@/Constants";

type ServiceAreasColumnProps = {
  title: string;
  items: string[];
  viewMore?: boolean;
};

export const ServiceAreasColumn = ({
  title,
  items,
  viewMore,
}: ServiceAreasColumnProps) => {
  return (
    <Stack spacing={0}>
      <TBody medium bold>
        {title}
      </TBody>
      {items.map((item, i) => (
        <Stack key={i}>
          <TBody>{item}</TBody>
        </Stack>
      ))}
      {viewMore && (
        <Link href={ROUTES.CONTACT}>
          <TBody medium>View More</TBody>
        </Link>
      )}
    </Stack>
  );
};
