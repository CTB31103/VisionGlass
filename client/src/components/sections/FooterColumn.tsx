import { Link, Stack } from "@mui/material";
import { TBody } from "../typography";
import { CSS } from "@/Constants";

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
  return (
    <Stack spacing={2} sx={{ color: CSS.colors.white }}>
      <TBody bungee medium>
        {title}
      </TBody>

      <Stack spacing={0.5}>
        {items.map((item) => (
          <Link
            href={item.href}
            color="inherit"
            underline={item.href ? "hover" : "none"}
            onClick={(e) => (item.href === undefined ? e.preventDefault() : {})}
          >
            <TBody medium bold innerHtml={item.text}></TBody>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
};
