import { Button, Heading } from "@chakra-ui/react";
import { type PropsWithChildren } from "react";
import type { ButtonColor } from "./types";
import {
  buttonBorderColorCSS,
  buttonColorCSS,
  buttonTextColorCSS,
} from "./utils";
import { useScreenSize } from "@/hooks";

type ActionButtonProps = {
  color?: ButtonColor;
  onClick?: () => void;
};

export const ActionButton = ({
  children,
  color: propColor = "none",
  onClick,
}: PropsWithChildren<ActionButtonProps>) => {
  const { lessThanEqualTo } = useScreenSize();
  return (
    <Button
      className="active:scale-100 hover:scale-105 hover:shadow-2xl transition-transform duration-75 p-10"
      // size={lessThanEqualTo.sm ? "xl" : "2xl"}
      size={"lg"}
      borderWidth={1.5}
      borderColor={buttonBorderColorCSS(propColor)}
      bg={buttonColorCSS(propColor)}
      color={buttonTextColorCSS(propColor)}
      onClick={onClick}
    >
      <Heading
        className="bungee-outline-thin"
        textWrap={"wrap"}
        fontSize={20}
        fontWeight={"black"}
      >
        {children}
      </Heading>
    </Button>
  );
};
