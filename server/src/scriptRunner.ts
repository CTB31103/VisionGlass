import mongoose from "mongoose";
import CONSTANTS from "./constants";
import { clearDB, createAdmin, createCustomers, printDB } from "./scripts";
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

      await clearDB();
      await createAdmin();
      await createCustomers();

      await printDB();

      exit();
    })();
  })
  .catch((err) => {
    Log.colors.redSpace("Failed to connect to MongoDB:", err);
  });
