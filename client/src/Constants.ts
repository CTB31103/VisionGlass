export const CONSTANTS = {
  api: {
    hostname: () => import.meta.env.VITE_API_HOSTNAME as string,
    isHttps: () => import.meta.env.VITE_HTTPS === "true",
    key: () => import.meta.env.VITE_API_KEY as string,

    recaptcha: () => import.meta.env.VITE_GOOGLE_CAPTCHA_SITE_KEY || "",
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
  SERVICE_WR: "/services/windshields",
  SERVICE_AG: "/services/autoglass",
  SERVICE_ADAS: "/services/adas",
  SERVICE_CC: "/services/crack-and-chip",
  SERVICE_MB: "/services/mobile",

  LOGIN: "/login",

  PROFILE: "/profile",

  DASHBOARD: "/dashboard",
  DASHBOARD_ADD: "/dashboard/add",

  CUSTOMERS: "/customers",
  CUSTOMERS_ADD: "/customers/add",
  CUSTOMERS_EDIT: "/customers/edit",

  TEAM: "/team",
  TEAM_ADD: "/team/admin-add",

  REVIEWS: "/reviews",

  TELEPHONE: "tel:+17163367222",
};

export const ALL_AUTH_ROUTES = [
  ROUTES.PROFILE,
  ROUTES.DASHBOARD,
  ROUTES.DASHBOARD_ADD,
  ROUTES.CUSTOMERS,
  ROUTES.CUSTOMERS_ADD,
  ROUTES.TEAM,
  ROUTES.TEAM_ADD,
  ROUTES.REVIEWS,
];

export const LOCATIONS = [
  {
    title: "New York",
    linkPath: ROUTES.CONTACT,
  },
  {
    title: "South Carolina",
    linkPath: ROUTES.CONTACT,
  },
  {
    title: "Kentucky",
    linkPath: ROUTES.CONTACT,
  },
  {
    title: "Massachusetts",
    linkPath: ROUTES.CONTACT,
  },
  {
    title: "Connecticut",
    linkPath: ROUTES.CONTACT,
  },
  {
    title: "Florida",
    linkPath: ROUTES.CONTACT,
  },
];

export const DEFAULT_PAGINATION_OPTION = { pageNumber: 1, pageLimit: 5 };

export const DEFAULT_PAGINATION_LIMIT_OPTIONS = [5, 10, 20];
