import CONSTANTS from "../constants";
import { IAttatchment } from "../interfaces";
import { AttatchmentModel, RootFilterQuery } from "../models";
import { HashUtils, ImageUtils, Log, TryCatch } from "../utils";
import Validators, { RULES, validationV2 } from "../validators";
import ControllerFunc from "./controllerFunc";

const upload = ControllerFunc((req, res) => {
  const savedUploads: string[] = [];

  TryCatch(
    async () => {
      const { userId } = Validators.TokenValidators.resLocalsTokenValues(
        res.locals,
      );

      if (!req.files) throw new Error(`No image found in upload`);

      const files = Array.isArray(req.files) ? req.files : req.files["files"];
      const diskFolder = ImageUtils.getUploadsFolder();

      const isPrivate = req.body?.isPrivate
        ? Boolean(req.body?.isPrivate)
        : false;

      for await (let file of files) {
        const fileNameId = HashUtils.uniqueId();
        const attatchmentId = await ImageUtils.saveFile(
          file.buffer,
          ImageUtils.join(diskFolder, fileNameId),
        );
        savedUploads.push(attatchmentId);
      }

      const createdOn = new Date().getTime();
      const groupId = HashUtils.uniqueId();
      const attatchments: IAttatchment[] = savedUploads.map((attachmentId) => ({
        attachmentId,
        createdOn,
        groupId,
        createdBy: userId,
        isPrivate,
      }));

      const createdAttatchments =
        await AttatchmentModel.insertMany(attatchments);

      res.status(200).json({
        attatchmentIds: savedUploads,
        attatchments: createdAttatchments.map((attatch) =>
          attatch.toAttatchment(),
        ),
      });
    },
    async (err) => {
      Log.colors.purpleSpace(`Aborting Upload`, savedUploads);
      const diskFolder = ImageUtils.getUploadsFolder();
      try {
        savedUploads.forEach((upload) =>
          ImageUtils.deleteFile(ImageUtils.join(diskFolder, upload)),
        );
      } catch (e) {}

      Log.colors.purpleSpace(`Abborted`);
      res.status(500).json({ error: err });
    },
  );
});

const serveImage = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const imageName = Validators.MediaValidators.includesImageName(
        req.params,
      );
      const diskFolder = ImageUtils.getUploadsFolder();

      const filePath = ImageUtils.join(diskFolder, imageName);

      if (filePath.indexOf(diskFolder + ImageUtils.sep()) !== 0) {
        return res.status(403).end("Forbidden");
      }

      const attatchment = await AttatchmentModel.find({
        attachmentId: imageName,
      });
      Log.colors.purple(`Attatchment:`);
      Log.colors.purple(attatchment);
      Log.colors.purple(``);

      ImageUtils.mustExist(filePath);

      const mimeType = ImageUtils.mimeType(imageName);
      const stream = ImageUtils.createReadStream(filePath);

      stream.on("open", function () {
        res.set("Content-Type", mimeType);
        stream.pipe(res);
      });
      stream.on("error", function () {
        res.set("Content-Type", "text/plain");
        res.status(404).end("Not found");
      });
    },
    (err) => res.status(500).send({ error: err }),
  ),
);

const getAttatchments = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const { validData, errorMsg } = validationV2<{
        attatchmentIds?: string | string[];
        groupIds?: string | string[];
      }>(
        {
          attatchmentIds: [
            Array.isArray(req.query?.attatchmentIds)
              ? RULES.common.optionalArray
              : RULES.common.optionalString,
            "",
          ],
          groupIds: [
            Array.isArray(req.query?.groupIds)
              ? RULES.common.optionalArray
              : RULES.common.optionalString,
            "",
          ],
        },
        req.query,
      );

      let databaseQuery: RootFilterQuery<IAttatchment> = {
        $and: [],
      };

      if (validData?.attatchmentIds) {
        if (Array.isArray(validData.attatchmentIds))
          databaseQuery.$and!.push({
            $or: validData.attatchmentIds.map(
              (id): RootFilterQuery<IAttatchment> => ({ attachmentId: id }),
            ),
          });
        else
          databaseQuery.$and!.push({ attachmentId: validData.attatchmentIds });
      }

      if (validData?.groupIds) {
        if (Array.isArray(validData.groupIds))
          databaseQuery.$and!.push({
            $or: validData.groupIds.map(
              (id): RootFilterQuery<IAttatchment> => ({ attachmentId: id }),
            ),
          });
        else databaseQuery.$and!.push({ attachmentId: validData.groupIds });
      }

      if ((databaseQuery.$and ?? []).length === 0)
        return res.send({ attatchments: [] });

      const attatchments = await AttatchmentModel.find(databaseQuery);

      res.send({
        attatchments: attatchments.map((attatch) => attatch.toAttatchment()),
      });
    },
    (err) => {
      res.status(500).json({ error: err });
    },
  ),
);

export const MediaController = {
  upload,
  serveImage,
  getAttatchments,
};
