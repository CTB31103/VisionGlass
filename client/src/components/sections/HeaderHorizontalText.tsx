import { CSS } from "@/Constants";
import { Box, Link, Stack } from "@mui/material";
import { TBody } from "../typography";

export type HeaderHorizontalTextProps = {
  text: string;
  linkPath: string;
  left?: boolean;
  right?: boolean;
  small?: boolean;
};

export const HeaderHorizontalText = ({
  text,
  linkPath,
  left,
  right,
  small,
}: HeaderHorizontalTextProps) => {
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

      <Link href={linkPath} variant="inherit">
        <TBody medium={!small} bungee>
          {text}
        </TBody>
      </Link>

      <Box
        sx={{
          width: 5,
          height: "100%",
          bgcolor: CSS.colors.white,
          opacity: right ? 1 : 0,
        }}
      />
    </Stack>
  );
};
