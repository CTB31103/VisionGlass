import { IMAGES } from "@/assets";
import { ROUTES } from "@/Constants";

export const Service = {
  Windshield: "Windshield Replacement",
  AutoGlass: "Auto Glass Replacement",
  ADAS: "ADAS Calibration",
  ChipRepair: "Crack & Chip Repair",
  Mobile: "Mobile Installs",
};

export const SERVICES = Array.from(Object.values(Service));
export const SELECTABLE_SERVICES = SERVICES.slice(0, 4);
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
