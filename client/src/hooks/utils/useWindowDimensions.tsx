import { useState } from "react";
import { useLocation } from "react-router";
import { useTimeoutEffect } from "./useTimeoutEffect";

export const useWindowDimensions = () => {
  const { pathname } = useLocation();
  const [dims, setDims] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useTimeoutEffect(
    () => {
      const resize = () => {
        setDims({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", resize);

      return () => window.removeEventListener("resize", resize);
    },
    [pathname],
    100,
  );

  return dims;
};
