import { Button } from "@chakra-ui/react";
import { type PropsWithChildren } from "react";
import type { ButtonColor } from "./types";
import {
  buttonBorderColorCSS,
  buttonColorCSS,
  buttonTextColorCSS,
} from "./utils";
import { TBody } from "../typography";

type ActionButtonProps = {
  loading?: boolean;
  fullWidth?: boolean;
  autoHeight?: boolean;
  lg?: boolean;
  color?: ButtonColor;
  onClick?: () => void;
};

export const ActionButton = ({
  fullWidth,
  autoHeight,
  children,
  lg,
  color: propColor = "none",
  loading,
  onClick,
}: PropsWithChildren<ActionButtonProps>) => {
  return (
    <Button
      className="active:scale-100 hover:scale-105 hover:shadow-2xl transition-transform duration-75"
      size={lg ? "2xl" : "lg"}
      h={autoHeight ? "auto" : undefined}
      w={fullWidth ? "100%" : undefined}
      borderWidth={1.5}
      borderColor={buttonBorderColorCSS(propColor)}
      bg={buttonColorCSS(propColor)}
      color={buttonTextColorCSS(propColor)}
      onClick={onClick}
      loading={loading}
    >
      <TBody bungee medium>
        {children}
      </TBody>
    </Button>
  );
};
