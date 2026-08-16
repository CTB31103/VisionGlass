import { useScreenSize } from "../utils";
import { SMALL_TEXT_SIZES, TEXT_SIZES, XSMALL_TEXT_SIZES } from "@/components";

export const useTextSizingService = () => {
  const { lessThanEqualTo: sizeAndUnder } = useScreenSize();

  return sizeAndUnder.xxs
    ? XSMALL_TEXT_SIZES
    : sizeAndUnder.sm
      ? SMALL_TEXT_SIZES
      : TEXT_SIZES;
};
