import { useCallback } from "react";
import { useWindowDimensions } from "./useWindowDimensions";

export type Range = [number, number];

export const ExactScreenSizeEnums: {
  xs: Range;
  sm: Range;
  md: Range;
  lg: Range;
  xl: Range;
} = {
  xs: [0, 599],
  sm: [600, 899],
  md: [900, 1199],
  lg: [1200, 1535],
  xl: [1536, 3000],
};

export const useExactScreenSizeValues = () => {
  const { width: windowWidth } = useWindowDimensions();

  const combineLowHighRanges = (lowRange: Range, highRange: Range): Range => {
    return [lowRange[0], highRange[1]];
  };

  const splitRangeInHalf = (range: Range): [Range, Range] => {
    const highHalf = Math.round(range[1] / 2);
    return [
      [range[0], highHalf],
      [highHalf, range[1]],
    ];
  };

  const exactScreenSizeValues = useCallback(
    <T,>(betweenPxls: Range[], values: T[], defaultTo: T) => {
      const valueIndex = betweenPxls.findIndex((pxlCombo) => {
        const [low, high] = pxlCombo;
        if (windowWidth >= low && windowWidth <= high) return true;
        return false;
      });

      if (valueIndex === -1 || valueIndex > values.length - 1) return defaultTo;

      return values[valueIndex];
    },
    [windowWidth],
  );

  return { exactScreenSizeValues, combineLowHighRanges, splitRangeInHalf };
};
