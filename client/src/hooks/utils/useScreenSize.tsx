import { useScreenSizeStore } from "@/stores";

export const useScreenSize = () => {
  const screenSize = useScreenSizeStore((state) => state.size);

  const exact = {
    xl: screenSize === "xs",
    lg: screenSize === "lg",
    md: screenSize === "md",
    sm: screenSize === "sm",
    xs: screenSize === "xs",
    xxs: screenSize === "xxs",
  };

  const lessThanEqualTo = {
    xl: true,
    lg: screenSize !== "xl",
    md: screenSize !== "xl" && screenSize !== "lg",
    sm: screenSize === "sm" || screenSize === "xs" || screenSize === "xxs",
    xs: screenSize === "xs" || screenSize === "xxs",
    xxs: screenSize === "xxs",
  };

  const greaterThanEqualTo = {
    xl: screenSize === "xl",
    lg: screenSize === "lg" || screenSize === "xl",
    md: screenSize !== "xs" && screenSize !== "sm",
    sm: screenSize !== "xs" && screenSize !== "xxs",
    xs: screenSize !== "xxs",
    xxs: true,
  };

  return {
    screenSize,
    exact,
    lessThanEqualTo,
    greaterThanEqualTo,
  };
};
