import mongoose from "mongoose";
import CONSTANTS from "./constants";
import {
  clearDB,
  createAdmin,
  createCustomers,
  createReviews,
  createTeam,
  printDB,
  printNamespace,
} from "./scripts";
import { Log } from "./utils";
import { exit } from "node:process";

const mongoUri =
  CONSTANTS.database.mongo.uri +
  CONSTANTS.database.mongo.db +
  "?directConnection=true&serverSelectionTimeoutMS=2000&replicaSet=rs0";
mongoose
  .connect(mongoUri, { timeoutMS: 15000 })
  .then((mongo) => {
    Log.colors.green(`Connected to MongoDB at ${mongoUri}`);

    (async () => {
      // await printDB();

      // await clearDB(true);

      // await createAdmin();
      // await createTeam();

      // await createCustomers();
      // await createCustomers();
      // await createReviews();

      await printDB(false);

      // await printNamespace("vision_auto_glass.CustomerQuotes");
      // await printNamespace("vision_auto_glass.calendarevents");

      exit();
    })();
  })
  .catch((err) => {
    Log.colors.redSpace("Failed to connect to MongoDB:", err);
  });
