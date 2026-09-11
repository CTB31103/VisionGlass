import { Log } from "./utils";

const CONSTANTS = {
  env: {
    isProduction: () => process.env.NODE_ENV === "prod",
    isDevelopment: () => process.env.NODE_ENV === "dev",
    dirName: () => __dirname,
  },
  network: {
    apiUrl: () => process.env.API_URL || ``,
    clientUrl: () => process.env.CLIENT_URL || ``,
    mongoUrl: () => {
      const mongoEnvUrl = process.env.MONGO_URL || ``;
      const replSetName = process.env.MONGO_REPL_NAME || ``;
      const ending = `directConnection=true&serverSelectionTimeoutMS=2000${replSetName.length > 0 ? `&replicaSet=${replSetName}` : ""}`;
      if (mongoEnvUrl.length === 0)
        return `mongo://127.0.0.1:27017/vision_glass?` + ending;
      const lastLetter = mongoEnvUrl[mongoEnvUrl.length - 1];
      if (lastLetter === "?" || lastLetter === "&") return mongoEnvUrl + ending;
      return mongoEnvUrl + "?" + ending;
    },
    port: () => process.env.PORT || 3000,
  },
  server: {
    headerAPIKey: "vag-api-key",
    apiAccessKey: () => process.env.SERVER_API_KEY || "default_api_key",
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
      path: () =>
        CONSTANTS.env.isProduction() ? "/uploads/public" : "/uploads/test",
      fairImageName: `fairs-schedule`,
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
