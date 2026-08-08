import { useScreenSizeStore } from "@/stores";

export const useScreenSize = () => {
  const screenSize = useScreenSizeStore((state) => state.size);

  const exact = {
    xl: screenSize === "xs",
    lg: screenSize === "lg",
    md: screenSize === "md",
    sm: screenSize === "sm",
    xs: screenSize === "xs",
  };

  const lessThanEqualTo = {
    xl: true,
    lg: screenSize !== "xl",
    md: screenSize !== "xl" && screenSize !== "lg",
    sm: screenSize === "sm" || screenSize === "xs",
    xs: screenSize === "xs",
  };

  const greaterThanEqualTo = {
    xl: screenSize === "xl",
    lg: screenSize === "lg" || screenSize === "xl",
    md: screenSize !== "xs" && screenSize !== "sm",
    sm: screenSize !== "xs",
    xs: true,
  };

  return {
    screenSize,
    exact,
    lessThanEqualTo,
    greaterThanEqualTo,
  };
};
