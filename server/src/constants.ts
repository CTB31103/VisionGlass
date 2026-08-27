const CONSTANTS = {
  env: {
    isProduction: () => process.env.NODE_ENV === "production",
    isDevelopment: () => process.env.NODE_ENV === "dev",
    dirName: () => __dirname,

    network: {
      hostname: () => process.env.HOST_NAME,
      https: () => process.env.HTTPS === "true",
    },
  },
  server: {
    port: 3000,
    headerAPIKey: "vag-api-key",
    apiAccessKey: () => process.env.SERVER_API_KEY || "default_api_key",
  },
  database: {
    mongo: {
      uri: "mongodb://127.0.0.1:27017/",
      db: "vision_auto_glass",
    },
  },
  auth: {
    jwt: {
      headerAccessKey: "vag-a-key",
      headerRefreshKey: "vag-r-key",
      secret: () => process.env.JWT_SECRET_KEY || "default_jwt_key",
    },
  },
  media: {
    uploads: {
      path: "/uploads",
    },
  },

  pagination: {
    default: {
      limit: 5,
      page: 1,
    },
  },
};

export default CONSTANTS;
