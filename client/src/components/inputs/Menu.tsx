import {
  Divider,
  Link,
  MenuItem,
  Menu as MMenu,
  Stack,
  type MenuProps as MMenuProps,
} from "@mui/material";
import { CSS } from "@/Constants";

export type MenuProps = {
  anchorEl: MMenuProps["anchorEl"];
  open: boolean;
  origin?: MMenuProps["anchorOrigin"];
  onClose?: () => void;

  items?: {
    text: string;
    onClick?: () => void;
    linkPath?: string;
  }[];
};

export const Menu = ({
  anchorEl,
  open,
  onClose,
  items = [],
  origin = { vertical: "top", horizontal: "right" },
}: MenuProps) => {
  return (
    <MMenu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={origin}
      slotProps={{
        paper: {
          sx: {
            border: 2,
            borderColor: CSS.colors.black,
          },
        },
        list: {
          sx: {},
          dense: true,
        },
      }}
    >
      {items.map((item, i, arr) => (
        <Stack sx={{ width: "100%" }} key={i}>
          <MenuItem onClick={item.onClick ?? onClose}>
            {item.linkPath ? (
              <Link href={item.linkPath}>{item.text}</Link>
            ) : (
              item.text
            )}
          </MenuItem>
          {i !== arr.length - 1 && <Divider />}
        </Stack>
      ))}
    </MMenu>
  );
};
