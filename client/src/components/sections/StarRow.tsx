import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Icons, type IconType } from "../icons";
import { TEXT_SIZES } from "../typography";
import { CSS } from "@/Constants";

export type StarRating = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

type StarRowProps = {
  filled?: StarRating;
};

export const StarRow = ({ filled = 5 }: StarRowProps) => {
  const [stars, setStars] = useState<IconType[]>([]);

  useEffect(() => {
    const callback = () => {
      const filledIndexBased = filled - 1;
      setStars(
        Array(5)
          .fill(Icons.StarOutline)
          .map((rNode, i) => {
            const isDecimal = filledIndexBased.toString().includes(".5");
            const indexGreaterThan = i > filledIndexBased;

            console.log(`i: ${i}`);
            console.log(`filled: ${filledIndexBased}`);
            console.log(``);

            if (indexGreaterThan) {
              if (isDecimal && i - 1 < filledIndexBased) return Icons.StarHalf;
              return rNode;
            }

            return Icons.StarFill;
          }),
      );
    };

    callback();
  }, [filled]);

  return (
    <Stack spacing={0.5} direction={"row"}>
      {stars.map((Star, i) => (
        <Stack key={i}>
          <Star
            sx={{
              fontSize: TEXT_SIZES.large,
              color: CSS.colors.yellow,
            }}
          />
        </Stack>
      ))}
    </Stack>
  );
};
