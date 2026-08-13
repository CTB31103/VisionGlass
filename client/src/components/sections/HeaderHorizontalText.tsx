import { CSS } from "@/Constants";
import { Box, Divider, Link, Menu, MenuItem, Stack } from "@mui/material";
import { TBody } from "../typography";
import { useRef, useState } from "react";
import { IMAGES } from "@/assets";
import { useNavigate } from "react-router";

export type HeaderHorizontalTextProps = {
  text: string;
  linkPath: string;
  menuOptions?: { title: string; linkPath: string }[];
  left?: boolean;
  right?: boolean;
  small?: boolean;
};

export const HeaderHorizontalText = ({
  text,
  linkPath,
  menuOptions,
  left,
  right,
  small,
}: HeaderHorizontalTextProps) => {
  const navigate = useNavigate();
  const anchorRef = useRef<null | HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <Stack
      sx={{
        flex: 1,
        justifyContent: "space-between",
        height: "100%",
        alignItems: "center",
      }}
      direction={"row"}
    >
      <Box
        sx={{
          width: 5,
          height: "100%",
          bgcolor: CSS.colors.white,
          opacity: left ? 1 : 0,
        }}
      />

      <Stack
        ref={anchorRef}
        direction={"row"}
        sx={{ alignItems: "center" }}
        spacing={1}
        onMouseEnter={() => setOpen(true)}
        onMouseDown={() => setOpen(false)}
      >
        {menuOptions ? (
          <TBody medium={!small} bungee>
            {text}
          </TBody>
        ) : (
          <Link href={linkPath} variant="inherit">
            <TBody medium={!small} bungee>
              {text}
            </TBody>
          </Link>
        )}

        {menuOptions && (
          <Box>
            <img
              style={{
                width: 20,
                height: 20,
                rotate: open ? "180deg" : "0deg",
              }}
              src={IMAGES.BorderChevron}
              alt="View our locations"
            />
          </Box>
        )}
      </Stack>

      <Box
        sx={{
          width: 5,
          height: "100%",
          bgcolor: CSS.colors.white,
          opacity: right ? 1 : 0,
        }}
      />

      {menuOptions && (
        <Menu
          anchorEl={anchorRef.current}
          open={open}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
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
          {menuOptions.map((option, i, arr) => (
            <Stack key={i}>
              <MenuItem onClick={() => (close(), navigate(option.linkPath))}>
                <Link href={option.linkPath}>{option.title}</Link>
              </MenuItem>
              {i !== arr.length - 1 && <Divider />}
            </Stack>
          ))}
        </Menu>
      )}
    </Stack>
  );
};
