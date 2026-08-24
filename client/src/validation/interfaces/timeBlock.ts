import type { ITimeBlock } from "@/interfaces";
import { RULES, validation } from "../validation";

export const validateTimeBlock = (
  data: unknown,
  labels: [string, string] = ["", ""],
) => {
  const [fromLabel, toLabel] = labels;
  const validTimeBlock = validation<ITimeBlock>(
    {
      from: [RULES.common.requiredNumber, fromLabel],
      to: [RULES.common.requiredNumber, toLabel],
    },
    data,
  );

  return validTimeBlock;
};
