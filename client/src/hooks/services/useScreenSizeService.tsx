import { useEffect } from "react";
import { useWindowDimensions } from "../utils";
import { useScreenSizeStore } from "@/stores";

export const useScreenSizeService = () => {
  const { size, setSize } = useScreenSizeStore();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width >= 1536) return setSize("xl");
    if (width >= 1200) return setSize("lg");
    if (width >= 900) return setSize("md");
    if (width >= 600) return setSize("sm");
    return setSize("xs");
  }, [width]);

  useEffect(() => {
    console.log(`Screen Size: ${size}`);
    console.log(``);
  }, [size]);
};
