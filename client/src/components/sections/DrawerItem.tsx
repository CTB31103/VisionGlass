import { CSS } from "@/Constants";
import { Box, Link, Stack } from "@mui/material";
import { THeading } from "../typography";
import type { HeaderHorizontalTextProps } from "./HeaderHorizontalText";
import { Collapse } from "../layout";
import { IMAGES } from "@/assets";

type DrawerItemProps = Omit<
  Omit<Omit<HeaderHorizontalTextProps, "small">, "left">,
  "right"
> & {
  divider?: boolean;
};

export const DrawerItem = ({
  text,
  linkPath,
  divider,
  menuOptions,
}: DrawerItemProps) => {
  return (
    <Stack
      sx={{
        alignItems: "start",
        justifyContent: "center",
        width: "100%",
      }}
      spacing={2}
    >
      {menuOptions ? (
        <Collapse
          Header={({ open }) => (
            <Stack spacing={1} sx={{ width: "100%" }}>
              <Stack
                direction={"row"}
                sx={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "start",
                }}
                spacing={1}
              >
                <THeading thin bungee>
                  {text}
                </THeading>
                <Box>
                  <img
                    style={{
                      width: 20,
                      height: 20,
                      rotate: open ? "180deg" : "0deg",
                    }}
                    src={IMAGES.BorderChevron}
                    alt="chevron"
                  />
                </Box>
              </Stack>

              {open && (
                <Stack sx={{ width: "100%", pl: 2 }}>
                  <Stack
                    sx={{
                      bgcolor: CSS.colors.white,
                      width: "100%",
                      height: 4,
                      borderWidth: 1,
                      borderColor: CSS.colors.black,
                    }}
                  />
                </Stack>
              )}
            </Stack>
          )}
        >
          <Stack sx={{ width: "100%", pl: 2, pt: 1 }} spacing={1}>
            {menuOptions.map((opt, i, arr) => (
              <Stack key={i} spacing={1} sx={{ width: "100%" }}>
                <Link
                  variant="inherit"
                  href={opt.linkPath}
                  underline="always"
                  sx={{ color: CSS.colors.white }}
                >
                  <THeading thin bungee>
                    {opt.title}
                  </THeading>
                </Link>

                {i !== arr.length - 1 && (
                  <Stack
                    sx={{
                      bgcolor: CSS.colors.white,
                      width: "100%",
                      height: 4,
                      borderWidth: 1,
                      borderColor: CSS.colors.black,
                    }}
                  />
                )}
              </Stack>
            ))}
          </Stack>
        </Collapse>
      ) : (
        <Link
          variant="inherit"
          href={linkPath}
          underline="always"
          sx={{ color: CSS.colors.white }}
        >
          <THeading thin bungee>
            {text}
          </THeading>
        </Link>
      )}
      {divider && (
        <Stack
          sx={{
            bgcolor: CSS.colors.white,
            width: "100%",
            height: 4,
            borderWidth: 1,
            borderColor: CSS.colors.black,
          }}
        />
      )}
    </Stack>
  );
};
