import { IMAGES } from "@/assets";
import { ROUTES } from "@/Constants";

export const Service = {
  Windshield: "Windshield Replacement",
  AutoGlass: "Auto Glass Replacement",
  ADAS: "ADAS Calibration",
  ChipRepair: "Crack & Chip Repair",
  Mobile: "Mobile Installations",
};

export const SERVICES = Array.from(Object.values(Service));
export const SERVICE_ROUTES = [
  ROUTES.SERVICE_WR,
  ROUTES.SERVICE_AG,
  ROUTES.SERVICE_ADAS,
  ROUTES.SERVICE_CC,
  ROUTES.SERVICE_MB,
];
export const SERVICE_IMAGES = [
  IMAGES.ServiceWR,
  IMAGES.ServiceAG,
  IMAGES.ServiceADAS,
  IMAGES.ServiceCC,
  IMAGES.ServiceMB,
];
