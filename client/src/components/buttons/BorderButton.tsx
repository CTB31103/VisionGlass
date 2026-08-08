import { type PropsWithChildren } from "react";
import type { ButtonColor } from "./types";
import { buttonColorCSS } from "./utils";
import { Button } from "@chakra-ui/react";

type BorderButtonProps = {
  color?: ButtonColor;
  onClick?: () => void;
};

export const BorderButton = ({
  children,
  color: propColor = "none",
  onClick,
}: PropsWithChildren<BorderButtonProps>) => {
  return (
    <Button
      variant={"outline"}
      color={buttonColorCSS(propColor)}
      borderColor={buttonColorCSS(propColor)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
