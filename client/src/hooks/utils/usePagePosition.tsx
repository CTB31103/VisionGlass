import { useState } from "react";
import { useTimeoutEffect } from "./useTimeoutEffect";

export const usePagePosition = (
  {
    allowableRange = 0,
  }: {
    allowableRange?: number;
  } = { allowableRange: 0 },
) => {
  const [pagePosition, setPagePosition] = useState({
    top: false,
    bottom: false,
    middle: false,
    scrollY: 0,
    viewportHeight: 0,
  });

  const inbetweenRangeIncl = (num: number, range: [number, number]) => {
    return range[0] <= num && num <= range[1];
  };

  useTimeoutEffect(
    () => {
      const calcScrollPosition = () => {
        const scrollY = Math.round(window.pageYOffset);
        const viewportHeight = Math.round(window.innerHeight);

        const viewportMiddle = Math.round(window.innerHeight / 2);

        setPagePosition({
          top: inbetweenRangeIncl(scrollY, [0, 0 + allowableRange]),
          bottom: inbetweenRangeIncl(scrollY, [
            viewportHeight - allowableRange,
            viewportHeight,
          ]),
          middle: inbetweenRangeIncl(scrollY, [
            viewportMiddle - allowableRange,
            viewportMiddle + allowableRange,
          ]),
          scrollY,
          viewportHeight,
        });
      };

      window.addEventListener("scroll", calcScrollPosition);
      return () => {
        window.removeEventListener("scroll", calcScrollPosition);
      };
    },
    [pagePosition.scrollY],
    50,
  );

  return pagePosition;
};
