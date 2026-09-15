import mongoose from "mongoose";
import CONSTANTS from "./constants";
import { Log } from "./utils";
import { createAdmin } from "./scripts";

const SECOND = 1000;

export const connectDB = async () => {
  const MAX_ATTEMPTS = 10;
  let attempts = MAX_ATTEMPTS;
  while (attempts > 0) {
    const mongoUri = CONSTANTS.network.mongoUrl();

    try {
      await mongoose.connect(mongoUri, { timeoutMS: 15 * SECOND });
      await createAdmin();
      Log.colors.green(`Connected to mongodb:`);
      attempts = 0;
      return true;
    } catch (err) {
      Log.colors.yellow(`Attempts left to connect to database: ${attempts}`);
      Log.colors.redSpace(`Could not connect to mongodb at: ${mongoUri}`);

      attempts -= 1;
      await new Promise((res) => setTimeout(res, 10 * SECOND));
    }
  }
  return false;
};
