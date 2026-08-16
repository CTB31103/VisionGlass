import { Link, Stack } from "@mui/material";
import { TBody, THeading } from "../typography";
import { ROUTES } from "@/Constants";
import { useScreenSize } from "@/hooks";

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
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  return (
    <Stack spacing={0} sx={{}}>
      {sizeUnder.xs ? (
        <THeading align={sizeUnder.xs ? "center" : undefined} bold>
          {title}
        </THeading>
      ) : (
        <TBody medium bold>
          {title}
        </TBody>
      )}
      {items.map((item, i) => (
        <Stack
          key={i}
          sx={sizeUnder.xs ? { width: "100%", alignItems: "center" } : {}}
        >
          <TBody
            align={sizeUnder.xs ? "center" : undefined}
            medium={sizeUnder.xs}
          >
            {item}
          </TBody>
        </Stack>
      ))}
      {viewMore && (
        <Link href={ROUTES.CONTACT}>
          <TBody
            align={sizeUnder.xs ? "center" : undefined}
            medium
            bold={sizeUnder.xs}
          >
            View More
          </TBody>
        </Link>
      )}
    </Stack>
  );
};
