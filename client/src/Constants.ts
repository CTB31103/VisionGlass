export const CONSTANTS = {
  api: {
    hostname: () => import.meta.env.VITE_API_HOSTNAME as string,
    isHttps: () => import.meta.env.VITE_HTTPS === "true",
    key: () => import.meta.env.VITE_API_KEY as string,
  },
};

export const CSS = {
  colors: {
    blue: "var(--accent-blue)",
    white: "var(--bg-white)",
    grey: "var(--bg-grey)",
    red: "var(--accent-red)",
    darkGrey: "var(--dark-grey)",
    black: "var(--color-black)",
    yellow: "var(--accent-yellow)",
  },
  hex: {
    white: "#f9f9f9",
    grey: "#d9d9d9",
    blue: "#305cde",
    red: "#f40000",
    darkGrey: "#646464",
    black: "#000",
    yellow: "#CC9C48",
  },
};

export const ERROR_MESSAGE = {
  required: {
    static: "This field is required",
    dynamic: (attr: string) => `${attr} is required`,
  },
};

export const TOKEN_KEYS = {
  ACCESS_KEY: "vag-a-key",
  REFRESH_KEY: "vag-r-key",
  API_KEY: "vag-api-key",
};

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  QUOTES: "/quote",
  FAIRS: "/fairs",

  SERVICES: "/services",
  SERVICE_AREAS: "/services/areas",
  SERVICE_WR: "/services/windshields",
  SERVICE_AG: "/services/autoglass",
  SERVICE_ADAS: "/services/adas",
  SERVICE_CC: "/services/chips",
  SERVICE_MB: "/services/mobile",

  LOGIN: "/login",

  DASHBOARD: "/dashboard",
  CUSTOMERS: "/customers",
  TEAM: "/team",
  REVIEWS: "/reviews",
};
