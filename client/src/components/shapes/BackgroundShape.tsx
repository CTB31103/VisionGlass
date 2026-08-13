import { useHoverable } from "@/hooks";
import { Stack } from "@mui/material";
import { useEffect, type PropsWithChildren, type ReactNode } from "react";

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
      onMouseEnter: () => void;
      onMouseLeave: () => void;
    };
  }) => ReactNode;
}>) => {
  const { isHovered, register } = useHoverable();

  useEffect(() => {
    console.log(`Hovering Background`);
    console.log(`Hovered: ${isHovered}`);
    console.log(``);
  }, [isHovered]);
  return (
    <Stack
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(${isHovered ? activePercentage : percentage}%, ${isHovered ? activePercentage : percentage}%)`,
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
      {HoverTarget ? <HoverTarget register={register} /> : children}
    </Stack>
  );
};
