import { Stack } from "@mui/material";
import { Icons } from "../icons";
import { TEXT_SIZES } from "../typography";
import { CSS } from "@/Constants";
import { useDimensions } from "@/hooks";

type SmallSquareUserProps = {
  noBorder?: boolean;
  colorInherit?: boolean;
};

export const SmallSquareUser = ({
  noBorder,
  colorInherit,
}: SmallSquareUserProps) => {
  const [squareRef, squareDims] = useDimensions();
  return (
    <Stack
      ref={squareRef}
      sx={{
        minWidth: "12vw",
        height: squareDims.width,

        alignItems: "center",
        justifyContent: "center",

        borderWidth: noBorder ? 0 : 1,
        borderColor: colorInherit ? "inherit" : CSS.colors.black,
        borderRadius: 5,
      }}
    >
      <Icons.User
        sx={{
          fontSize: TEXT_SIZES.largest,
          color: colorInherit ? "inherit" : CSS.colors.black,
        }}
      />
    </Stack>
  );
};
