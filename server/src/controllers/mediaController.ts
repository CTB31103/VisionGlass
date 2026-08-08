import CONSTANTS from "../constants";
import { IAttatchment } from "../interfaces";
import { AttatchmentModel } from "../models";
import {
  HashUtils,
  ImageUtils,
  Log,
  SessionController,
  TryCatch,
} from "../utils";
import Validators from "../validators";
import ControllerFunc from "./controllerFunc";

const upload = ControllerFunc((req, res) => {
  const savedUploads: string[] = [];

  TryCatch(
    async () => {
      if (!req.files || !Array.isArray(req.files))
        throw new Error(`No image found in upload`);

      const files = req.files;
      const diskFolder = ImageUtils.init(CONSTANTS.media.uploads.path);

      for await (let file of files) {
        const fileName = HashUtils.uniqueId();
        const attatchmentId = await ImageUtils.saveFile(
          file.buffer,
          ImageUtils.join(diskFolder, fileName),
        );
        savedUploads.push(attatchmentId);
      }

      const createdOn = new Date().getTime();
      const groupId = HashUtils.uniqueId();
      const attatchments: IAttatchment[] = savedUploads.map((attachmentId) => ({
        attachmentId,
        createdOn,
        groupId,
      }));

      await AttatchmentModel.insertMany(attatchments);

      res.status(200).json({ attatchmentIds: savedUploads });
    },
    async (err) => {
      Log.colors.purpleSpace(`Aborting Upload`, savedUploads);
      const diskFolder = ImageUtils.init(CONSTANTS.media.uploads.path);
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
      const diskFolder = ImageUtils.init(CONSTANTS.media.uploads.path);

      const filePath = ImageUtils.join(diskFolder, imageName);

      if (filePath.indexOf(diskFolder + ImageUtils.sep()) !== 0) {
        return res.status(403).end("Forbidden");
      }

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

export const MediaController = {
  upload,
  serveImage,
};
