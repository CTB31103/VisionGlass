import { Link, Stack } from "@mui/material";
import { IconButton } from "../buttons";
import { CSS, ROUTES } from "@/Constants";
import { Icons } from "../icons";
import { LocationsMenu } from "./LocationsMenu";
import { THeading } from "../typography";
import { useRef, useState } from "react";

type HeaderSmallBarProps = {
  onDrawer?: () => void;
};

export const HeaderSmallBar = ({ onDrawer }: HeaderSmallBarProps) => {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <Stack
      direction={"row"}
      sx={{
        bgcolor: CSS.colors.blue,
        paddingBlock: 1,
        paddingInline: 2,
        alignItems: "center",
        justifyContent: "space-between",

        borderColor: CSS.colors.black,
        borderBottomWidth: 1,
      }}
    >
      <Stack
        direction={"row"}
        spacing={2}
        sx={{ alignItems: "center", color: CSS.colors.white }}
      >
        <IconButton
          Icon={Icons.Menu}
          bgcolor={CSS.colors.white}
          borderColor={CSS.colors.black}
          color={CSS.colors.black}
          onClick={onDrawer}
        />

        <Link href={ROUTES.HOME} color="inherit">
          <THeading bold>Vision Glass</THeading>
        </Link>
      </Stack>

      <Stack direction={"row"} spacing={0}>
        <Stack ref={anchorRef} onClick={() => setOpen((prev) => !prev)}>
          <IconButton Icon={Icons.Location} borderColor={CSS.colors.white} />
        </Stack>
        <LocationsMenu
          origin={{ vertical: "bottom", horizontal: "left" }}
          anchorEl={anchorRef.current}
          open={open}
          onClose={() => setOpen(false)}
        />

        <Link href={ROUTES.TELEPHONE}>
          <IconButton Icon={Icons.Phone} borderColor={CSS.colors.white} />
        </Link>
      </Stack>
    </Stack>
  );
};
