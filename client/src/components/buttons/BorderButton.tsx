import { type PropsWithChildren } from "react";
import type { ButtonColor } from "./types";
import { buttonColorCSS } from "./utils";
import { Button } from "@chakra-ui/react";
import clsx from "clsx";

type BorderButtonProps = {
  fullWidth?: boolean;
  disabled?: boolean;
  color?: ButtonColor;
  thin?: boolean;
  lg?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const BorderButton = ({
  fullWidth,
  children,
  thin,
  disabled,
  lg,
  color: propColor = "none",
  onClick,
}: PropsWithChildren<BorderButtonProps>) => {
  return (
    <Button
      className={clsx(
        "transition-transform duration-75",
        !disabled ? "active:scale-100 hover:scale-105 hover:shadow-xl" : "",
      )}
      size={lg ? "2xl" : thin ? "md" : "lg"}
      borderWidth={1.5}
      w={fullWidth ? "100%" : undefined}
      variant={"outline"}
      color={buttonColorCSS(propColor)}
      borderColor={buttonColorCSS(propColor)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
