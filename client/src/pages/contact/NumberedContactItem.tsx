import { Icons, NumberedItem, TBody } from "@/components";
import { CSS } from "@/Constants";
import { useScreenSize } from "@/hooks";
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
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  return (
    <Stack
      sx={{
        width: "100%",
        cursor: "pointer",
      }}
      spacing={1}
      onClick={onClick}
    >
      <NumberedItem number={number} active={active} centered={sizeUnder.xs}>
        <Stack spacing={1}>
          <Stack>
            <Link color="inherit" sx={{ pointerEvents: "none" }}>
              <TBody
                align={sizeUnder.xs ? "center" : undefined}
                medium
                bold
                color={active ? CSS.colors.blue : undefined}
              >
                {title}
              </TBody>
              <TBody align={sizeUnder.xs ? "center" : undefined}>
                {address}
              </TBody>
              <TBody align={sizeUnder.xs ? "center" : undefined}>{phone}</TBody>
            </Link>
          </Stack>
          <Stack direction={sizeUnder.xs ? "column" : "row"} spacing={1}>
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
    </Stack>
  );
};
