import { Link, Stack } from "@mui/material";
import { TBody } from "../typography";
import { CSS } from "@/Constants";
import { useScreenSize } from "@/hooks";

type FooterItemProps = {
  text: string;
  href?: string;
  actionBtn?: boolean;
};

type FooterColumnProps = {
  title: string;
  items: FooterItemProps[];
};

export const FooterColumn = ({ title, items }: FooterColumnProps) => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  return (
    <Stack
      spacing={sizeUnder.md ? 1 : 2}
      sx={{
        color: CSS.colors.white,
        width: sizeUnder.xs
          ? "100%"
          : sizeUnder.sm
            ? "33%"
            : sizeUnder.md
              ? "25%"
              : undefined,
      }}
    >
      <TBody bungee medium large align={sizeUnder.sm ? "center" : undefined}>
        {title}
      </TBody>

      <Stack spacing={0.5}>
        {items.map((item) => (
          <Link
            key={item.text}
            href={item.href}
            color="inherit"
            underline={item.href ? "hover" : "none"}
            onClick={(e) => (item.href === undefined ? e.preventDefault() : {})}
          >
            <TBody
              align={sizeUnder.sm ? "center" : undefined}
              medium
              bold={!sizeUnder.md}
              innerHtml={item.text}
            ></TBody>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
};
