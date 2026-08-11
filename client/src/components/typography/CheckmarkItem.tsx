import { CSS } from "@/Constants";
import { useDimensions } from "@/hooks";
import { Stack } from "@mui/material";
import { TBody } from "./TBody";
import { Icons } from "../icons";
import { TEXT_SIZES } from "./textSizes";

type CheckmarkItemProps = {
  text: string;
};

export const CheckmarkItem = ({ text }: CheckmarkItemProps) => {
  const [squareRef, squareDims] = useDimensions();
  return (
    <Stack direction={"row"} spacing={4}>
      <Stack
        ref={squareRef}
        sx={{
          border: 1,
          borderColor: CSS.colors.black,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
          height: squareDims.width,
          // p: 2,
          p: 0.5,
        }}
      >
        <Icons.Checkmark
          sx={{
            fontSize: TEXT_SIZES.small,
          }}
        />
      </Stack>
      <TBody>{text}</TBody>
    </Stack>
  );
};
