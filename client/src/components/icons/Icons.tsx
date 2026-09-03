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
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SellIcon from "@mui/icons-material/Sell";
import ConstructionIcon from "@mui/icons-material/Construction";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

import LogoutIcon from "@mui/icons-material/Logout";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PasswordIcon from "@mui/icons-material/Password";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityOnIcon from "@mui/icons-material/Visibility";

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

  Expand: UnfoldMoreIcon,
  Contract: UnfoldLessIcon,

  Add: AddIcon,
  Edit: EditIcon,
  Delete: DeleteIcon,

  Search: SearchIcon,
  Calendar: CalendarMonthIcon,
  Sales: SellIcon,
  Tools: ConstructionIcon,

  User: AccountCircleIcon,
  Person: PersonIcon,

  Car: DirectionsCarIcon,
  Logout: LogoutIcon,
  Upload: FileUploadIcon,

  Password: PasswordIcon,

  HideOn: VisibilityOffIcon,
  HideOff: VisibilityOnIcon,
};

export type IconType = OverridableComponent<SvgIconTypeMap<object, "svg">> & {
  muiName: string;
};
