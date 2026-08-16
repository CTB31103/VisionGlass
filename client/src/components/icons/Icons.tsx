import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import type { SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CheckIcon from "@mui/icons-material/Check";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";

import MenuIcon from "@mui/icons-material/Menu";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import PhoneIcon from "@mui/icons-material/Phone";

import CloseIcon from "@mui/icons-material/Close";

export const Icons = {
  Close: CloseIcon,

  ChevronDown: KeyboardArrowDownIcon,
  ChevronLeft: KeyboardArrowLeftIcon,
  ChevronRight: KeyboardArrowRightIcon,
  ChevronUp: KeyboardArrowUpIcon,

  StarFill: StarIcon,
  StarHalf: StarHalfIcon,
  StarOutline: StarBorderIcon,

  Medal: WorkspacePremiumIcon,
  Checkmark: CheckIcon,

  Play: PlayArrowIcon,
  Pause: PauseIcon,

  FastForwardIcon,
  FastRewindIcon,
  Menu: MenuIcon,
  Location: LocationPinIcon,
  Phone: PhoneIcon,
};

export type IconType = OverridableComponent<SvgIconTypeMap<object, "svg">> & {
  muiName: string;
};
