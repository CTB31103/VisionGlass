import mongoose from "mongoose";
import CONSTANTS from "../constants";
import { ImageUtils, Log } from "../utils";
import { AttatchmentModel } from "../models";

const SKIP = ["vision_auto_glass.RefreshTokens", "vision_auto_glass.Users"];

export const clearDB = async (fullWipe: boolean = true) => {
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
  await Promise.all(
    collections.map(async (coll) =>
      !fullWipe && SKIP.includes(coll.namespace)
        ? {}
        : await coll.deleteMany({}),
    ),
  );

  Log.colors.yellow(`All collections cleared:`);
  Log.colors.yellow(
    Log.json(collections.map((collection) => collection.namespace)),
  );
  Log.colors.yellow(``);
};
