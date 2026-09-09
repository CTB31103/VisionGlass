import { Button } from "@chakra-ui/react";
import { type PropsWithChildren, type ReactNode } from "react";
import type { ButtonColor } from "./types";
import {
  buttonBorderColorCSS,
  buttonColorCSS,
  buttonTextColorCSS,
} from "./utils";
import { TBody } from "../typography";
import clsx from "clsx";

type ActionButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  autoHeight?: boolean;
  lg?: boolean;
  color?: ButtonColor;
  onClick?: () => void;
  EndIcon?: ReactNode;
  StartIcon?: ReactNode;
};

export const ActionButton = ({
  fullWidth,
  autoHeight,
  children,
  lg,
  color: propColor = "none",
  loading,
  disabled,
  EndIcon,
  StartIcon,
  onClick,
}: PropsWithChildren<ActionButtonProps>) => {
  return (
    <Button
      className={clsx(
        "transition-transform duration-75",
        !disabled ? "active:scale-100 hover:scale-105 hover:shadow-2xl" : "",
      )}
      size={lg ? "2xl" : "lg"}
      h={autoHeight ? "auto" : undefined}
      w={fullWidth ? "100%" : undefined}
      borderWidth={1.5}
      borderColor={buttonBorderColorCSS(propColor)}
      bg={buttonColorCSS(propColor)}
      color={buttonTextColorCSS(propColor)}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
    >
      {StartIcon}
      <TBody bungee medium>
        {children}
      </TBody>
      {EndIcon}
    </Button>
  );
};
