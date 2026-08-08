import { CSS } from "@/Constants";
import { CandyCaneShape } from "./CandyCaneShape";
import { CandyCaneStart } from "./CandyCaneStart";
import {
  ExactScreenSizeEnums,
  useExactScreenSizeValues,
  useScreenSize,
  useWindowDimensions,
  type Range,
} from "@/hooks";

export const CandyCaneBg = () => {
  const { exactScreenSizeValues } = useExactScreenSizeValues();
  const { lessThanEqualTo } = useScreenSize();
  const { height: windowHeight } = useWindowDimensions();

  const screenSizeRanges: Range[] = [
    [0, 350],
    ExactScreenSizeEnums.xs,
    ExactScreenSizeEnums.sm,
  ];

  return (
    <div className="absolute z-0 top-0 left-0 w-full">
      <div className="relative w-full">
        <CandyCaneStart
          angleAmp={lessThanEqualTo.sm ? 2 : 1}
          heightAmp={exactScreenSizeValues(
            screenSizeRanges,
            [1.25, 0.85, 0.85],
            1.35,
          )}
        />

        <CandyCaneShape
          flipped
          translateY={windowHeight / 5}
          angleAmp={0.75}
          heightAmp={exactScreenSizeValues(
            screenSizeRanges,
            [1.25, 0.95, 0.85],
            1.25,
          )}
        />

        <CandyCaneShape
          color={CSS.hex.blue}
          translateY={(windowHeight / 5) * 2}
          heightAmp={exactScreenSizeValues(
            screenSizeRanges,
            [2, 0.95, 0.85],
            1.25,
          )}
        />
      </div>
    </div>
  );
};
