import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import type { SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

export const Icons = {
  ChevronDown: KeyboardArrowDownIcon,
  ChevronLeft: KeyboardArrowLeftIcon,
  ChevronRight: KeyboardArrowRightIcon,
  ChevronUp: KeyboardArrowUpIcon,

  StarFill: StarIcon,
  StarHalf: StarHalfIcon,
  StarOutline: StarBorderIcon,
};

export type IconType = OverridableComponent<SvgIconTypeMap<object, "svg">> & {
  muiName: string;
};
