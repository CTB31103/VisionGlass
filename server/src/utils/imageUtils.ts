import path from "path";
import fs from "fs";
import sharp, { AvailableFormatInfo, FormatEnum } from "sharp";
import CONSTANTS from "../constants";

const init = (folderLocation: string) => {
  const splitFolderLocationPaths = folderLocation.split("/");
  const uploadLocation = path.join(
    CONSTANTS.env.dirName(),
    ...splitFolderLocationPaths,
  );

  if (!fs.existsSync(uploadLocation)) {
    fs.mkdirSync(uploadLocation, { recursive: true });
  }

  return uploadLocation;
};

const join = (...paths: string[]) => path.join(...paths);

const saveFile = async (
  buffer: Buffer<ArrayBufferLike>,
  outputTo: string,
  filetype: keyof FormatEnum | AvailableFormatInfo = "webp",
) => {
  const split = outputTo.split("/");
  await sharp(buffer)
    .resize(500, 500, { fit: "inside" })
    .toFormat(filetype)
    .webp({ quality: 80 })
    .toFile(outputTo + "." + filetype);
  return `${split[split.length - 1]}.${filetype}`;
};

const deleteFile = async (filePath: string) => fs.unlinkSync(filePath);

const sep = () => path.sep;

const mimeType = (filename: string) => {
  const mimeTypes = {
    txt: "text/plain",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    svg: "image/svg+xml",
    webp: "image/webp",
  };
  const matchArrary = filename.match(/\.\w+,*/);
  if (!matchArrary) return mimeTypes.txt;
  const ending = matchArrary[0];
  if (!ending) return mimeTypes.txt;

  const value = mimeTypes[ending as keyof typeof mimeTypes] || mimeTypes.txt;
  return value;
};

const mustExist = (filePath: string) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Image does not exist`);
  }
};

const createReadStream = (filePath: string) => {
  return fs.createReadStream(filePath);
};

const toClientUrl = (fileName: string) =>
  `http${CONSTANTS.env.network.https() ? "s" : ""}://${CONSTANTS.env.network.hostname()}/api/media/serve/${fileName}`;

export const ImageUtils = {
  init,
  join,
  saveFile,
  deleteFile,
  sep,
  mimeType,
  createReadStream,
  mustExist,
  toClientUrl,
};
