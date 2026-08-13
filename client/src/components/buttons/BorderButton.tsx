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
      className="active:scale-100 hover:scale-105 hover:shadow-2xl transition-transform duration-75 p-10"
      size={"lg"}
      borderWidth={1.5}
      variant={"outline"}
      color={buttonColorCSS(propColor)}
      borderColor={buttonColorCSS(propColor)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
