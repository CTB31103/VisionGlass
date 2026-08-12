import { Icons, NumberedItem, TBody } from "@/components";
import { CSS } from "@/Constants";
import { Chip, Link, Stack } from "@mui/material";

type NumberedContactItemProps = {
  number: number;
  title: string;
  address: string;
  phone: string;
  active?: boolean;
  mobile?: boolean;
  inShop?: boolean;
  onClick?: () => void;
};

export const NumberedContactItem = ({
  number,
  title,
  address,
  phone,
  active,
  mobile,
  inShop,
  onClick,
}: NumberedContactItemProps) => {
  return (
    <NumberedItem number={number} active={active} onClick={onClick}>
      <Stack spacing={1}>
        <Stack>
          <Link color="inherit" sx={{ pointerEvents: "none" }}>
            <TBody medium bold color={active ? CSS.colors.blue : undefined}>
              {title}
            </TBody>
          </Link>
          <TBody>{address}</TBody>
          <TBody>{phone}</TBody>
        </Stack>
        <Stack direction={"row"} spacing={1}>
          {mobile !== false && (
            <Chip
              icon={<Icons.Checkmark fontSize="small" color="primary" />}
              variant="outlined"
              label={"24/7 Mobile Service"}
            />
          )}
          {inShop !== false && (
            <Chip
              icon={<Icons.Checkmark fontSize="small" color="primary" />}
              variant="outlined"
              label={"Shop by appt"}
            />
          )}
        </Stack>
      </Stack>
    </NumberedItem>
  );
};
