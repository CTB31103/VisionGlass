import { IMAGES } from "@/assets";
import { CSS, ROUTES } from "@/Constants";
import { useScreenSize } from "@/hooks";
import { Drawer, Link, Stack } from "@mui/material";
import { IconButton } from "../buttons";
import { Icons } from "../icons";
import { TEXT_SIZES } from "../typography";
import { DrawerItem } from "./DrawerItem";
import type { HeaderNavLinksProps } from "./HeaderNavLinks";

type HeaderDrawerProps = {
  openDrawer: boolean;
  routes: HeaderNavLinksProps["links"];
  onClose: () => void;
};

export const HeaderDrawer = ({
  openDrawer,
  routes,
  onClose,
}: HeaderDrawerProps) => {
  const { lessThanEqualTo: sizeAndUnder } = useScreenSize();
  return (
    <Drawer open={openDrawer} onClose={onClose}>
      <Stack
        sx={{
          width: sizeAndUnder.xs ? "100vw" : "75vw",
          height: "100%",

          bgcolor: CSS.colors.grey,

          position: "relative",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            position: "sticky",
            top: 0,
            left: 0,
            zIndex: 2,
          }}
        >
          <Stack
            sx={{
              width: "100%",
              alignItems: "center",
              position: "relative",

              bgcolor: CSS.colors.grey,
              borderBottomWidth: 2,
              borderColor: CSS.colors.black,

              paddingInline: 4,
              paddingBlock: 2,
            }}
          >
            <Link href={ROUTES.HOME} variant="inherit">
              <img
                src={IMAGES.LogoSmall}
                alt="Vision Glass: How Big Is Your Crack?"
                style={{
                  width: 175,
                }}
              />
            </Link>

            <Stack
              direction={"row"}
              sx={{
                position: "absolute",
                height: "100%",
                top: 0,
                left: 0,
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={onClose}
                Icon={Icons.Close}
                fontSize={TEXT_SIZES.large}
                color={CSS.colors.black}
              />
            </Stack>
          </Stack>
        </Stack>

        <Stack
          sx={{
            paddingInline: 4,
            pt: 2,
            pb: 8,
            width: "100%",
            height: "100%",
            bgcolor: CSS.colors.blue,
            overflowY: "scroll",
          }}
          spacing={2}
        >
          {routes.map((route, i, arr) => (
            <DrawerItem key={i} {...route} divider={i !== arr.length - 1} />
          ))}
        </Stack>
      </Stack>
    </Drawer>
  );
};
