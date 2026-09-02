import mongoose from "mongoose";
import CONSTANTS from "../constants";
import { ImageUtils, Log } from "../utils";
import { AttatchmentModel } from "../models";

export const clearDB = async () => {
  const database = mongoose.connection.db;
  if (!database) return Log.colors.red(`No database found`);
  Log.colors.yellow(`Database: ${database.databaseName}`);

  const allAttatchments = await AttatchmentModel.find({});
  const diskPath = ImageUtils.getUploadsFolder();
  for await (const attatchment of allAttatchments) {
    await ImageUtils.deleteFile(
      ImageUtils.join(diskPath, attatchment.attachmentId),
    );
  }

  const collections = await database.collections();
  await Promise.all(collections.map(async (coll) => await coll.deleteMany({})));

  Log.colors.yellow(`All collections cleared:`);
  Log.colors.yellow(
    Log.json(collections.map((collection) => collection.namespace)),
  );
  Log.colors.yellow(``);
};
