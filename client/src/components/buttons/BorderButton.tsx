import { type PropsWithChildren } from "react";
import type { ButtonColor } from "./types";
import { buttonColorCSS } from "./utils";
import { Button } from "@chakra-ui/react";

type BorderButtonProps = {
  fullWidth?: boolean;
  color?: ButtonColor;
  thin?: boolean;
  lg?: boolean;
  onClick?: () => void;
};

export const BorderButton = ({
  fullWidth,
  children,
  thin,
  lg,
  color: propColor = "none",
  onClick,
}: PropsWithChildren<BorderButtonProps>) => {
  return (
    <Button
      className="active:scale-100 hover:scale-105 hover:shadow-2xl transition-transform duration-75"
      size={lg ? "2xl" : thin ? "md" : "lg"}
      borderWidth={1.5}
      w={fullWidth ? "100%" : undefined}
      variant={"outline"}
      color={buttonColorCSS(propColor)}
      borderColor={buttonColorCSS(propColor)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
