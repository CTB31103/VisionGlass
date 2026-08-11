import { Link, Stack } from "@mui/material";
import { TBody } from "../typography";
import { CSS } from "@/Constants";
import { useDimensions } from "@/hooks";
import clsx from "clsx";

type ServiceCardProps = {
  title?: string;
  innerTitle?: string;
  href?: string;
  url?: string;
  smallText?: boolean;
};

export const ServiceCard = ({
  title,
  innerTitle,
  href,
  url,
  smallText,
}: ServiceCardProps) => {
  const [rootRef, dimensions] = useDimensions();

  return (
    <Link href={href} underline="none">
      <Stack
        ref={rootRef}
        className={clsx(
          "transition-[translate] duration-75",
          "border-2! border-black!",
          href ? "hover:-translate-y-2.5 hover:border-4!" : "",
        )}
        sx={{
          borderRadius: 5,
          height: dimensions.width,
          backgroundImage: url ? `url(${url})` : "unset",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <Stack
          sx={{
            bgcolor: CSS.colors.blue,
            minHeight: "25%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack sx={{ width: "80%" }}>
            <TBody
              innerHtml={innerTitle}
              align="center"
              medium={!smallText}
              bungee
            >
              {title}
            </TBody>
          </Stack>
        </Stack>
      </Stack>
    </Link>
  );
};
