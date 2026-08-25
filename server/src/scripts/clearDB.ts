import mongoose from "mongoose";
import CONSTANTS from "../constants";
import { Log } from "../utils";

export const clearDB = async () => {
  const database = mongoose.connection.db;
  if (!database) return Log.colors.red(`No database found`);
  Log.colors.yellow(`Database: ${database.databaseName}`);

  const collections = await database.collections();
  await Promise.all(collections.map(async (coll) => await coll.deleteMany({})));

  Log.colors.yellow(`All collections cleared:`);
  Log.colors.yellow(
    Log.json(collections.map((collection) => collection.namespace)),
  );
  Log.colors.yellow(``);
};
