import { CSS } from "@/Constants";
import { Box, Stack } from "@mui/material";
import { TBody } from "../typography";
import {
  HeaderHorizontalText,
  type HeaderHorizontalTextProps,
} from "./HeaderHorizontalText";

type HeaderNavLinksProps = {
  links: Omit<HeaderHorizontalTextProps, "small">[];
  bgcolor?: string;
  small?: boolean;
  smallText?: boolean;
};

export const HeaderNavLinks = ({
  links,
  bgcolor = CSS.colors.blue,
  small,
  smallText,
}: HeaderNavLinksProps) => {
  return (
    <Stack
      direction={"row"}
      sx={{
        bgcolor,
        paddingInline: 8,
        paddingBlock: small ? 1 : 2,

        borderBottomWidth: 1,
        borderBottomColor: CSS.colors.black,
      }}
    >
      <Stack
        sx={{
          position: "relative",
          width: "100%",
          paddingBlock: 1,
        }}
      >
        <Box sx={{ opacity: 0 }}>
          <TBody medium={!smallText} bungee>
            Hide Text
          </TBody>
        </Box>

        <Stack
          direction={"row"}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {links.map((link) => (
            <HeaderHorizontalText key={link.text} {...link} small={smallText} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
