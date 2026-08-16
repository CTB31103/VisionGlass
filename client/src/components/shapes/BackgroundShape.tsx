import { useHoverable, useScreenSize, useTimeoutEffect } from "@/hooks";
import { Stack } from "@mui/material";
import { useState, type PropsWithChildren, type ReactNode } from "react";

export const BackgroundShape = ({
  children,
  percentage = -40,
  activePercentage = -45,
  HoverTarget,
}: PropsWithChildren<{
  percentage?: number;
  activePercentage?: number;
  HoverTarget?: (props: {
    register: {
      onClick: () => void;
      onMouseEnter: () => void;
      onMouseLeave: () => void;
    };
  }) => ReactNode;
}>) => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();

  const { isHovered, register } = useHoverable();
  const [clickOverHover, setClickOverHover] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const active = sizeUnder.md || clickOverHover ? isClicked : isHovered;

  useTimeoutEffect(
    () => {
      if (isClicked) setIsClicked(false);
      else {
        register.onMouseLeave();
        setClickOverHover(false);
      }
    },
    [isClicked],
    250,
  );
  return (
    <Stack
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(${active ? activePercentage : percentage}%, ${active ? activePercentage : percentage}%)`,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 0,
        pointerEvents: "all",

        transition: "transform .15s ease-in",

        "&:hover": HoverTarget
          ? undefined
          : {
              transform: `translate(${activePercentage}%, ${activePercentage}%)`,
            },
      }}
    >
      {HoverTarget ? (
        <HoverTarget
          register={{
            ...register,
            onClick: () => {
              setIsClicked((prev) => !prev);
              setClickOverHover(true);
            },
          }}
        />
      ) : (
        children
      )}
    </Stack>
  );
};
