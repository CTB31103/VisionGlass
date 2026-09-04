import mongoose from "mongoose";
import { Log } from "../utils";

export const printDB = async (short = true) => {
  const database = mongoose.connection.db;
  if (!database) return Log.colors.red(`No database found`);
  Log.colors.yellow(`Database: ${database.databaseName}`);

  const collections = await database.collections();

  if (!short) {
    for await (let coll of collections) {
      const items = await coll.find({}).toArray();
      Log.colors.yellow(`${coll.namespace}:`);
      Log.colors.yellow(Log.json(items));
      Log.colors.yellow(``);
    }

    Log.colors.yellow(``);
    Log.colors.yellow(`----  ----  ----  ----  ----`);
    Log.colors.yellow(``);
  }

  for await (let coll of collections) {
    const itemCount = await coll.countDocuments({});
    Log.colors.yellow(`${coll.namespace} - ${itemCount}`);
  }

  Log.colors.yellow(``);
};

export const printNamespace = async (namespace: string) => {
  const database = mongoose.connection.db;
  if (!database) return Log.colors.red(`No database found`);

  const collection = (await database.collections()).find(
    (coll) => coll.namespace === namespace,
  );
  if (!collection) return Log.colors.red(`No collection found`);

  const items = await collection.find({}).toArray();
  Log.colors.yellow(`${collection.namespace}:`);
  Log.colors.yellow(Log.json(items));
  Log.colors.yellow(``);

  Log.colors.yellow(``);
  Log.colors.yellow(`----  ----  ----  ----  ----`);
  Log.colors.yellow(``);

  Log.colors.yellow(
    `${collection.namespace} - ${await collection.countDocuments()}`,
  );
};
