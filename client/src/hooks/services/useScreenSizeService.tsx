import { useEffect } from "react";
import { useWindowDimensions } from "../utils";
import { useScreenSizeStore } from "@/stores";

export const useScreenSizeService = () => {
  const { setSize } = useScreenSizeStore();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width >= 1536) return setSize("xl");
    if (width >= 1000) return setSize("lg");
    if (width >= 800) return setSize("md");
    if (width >= 600) return setSize("sm");
    if (width >= 350) return setSize("xs");
    return setSize("xxs");
  }, [width]);

  // useEffect(() => {
  //   console.log(`Screen Size: ${size}`);
  //   console.log(``);
  // }, [size]);
};
