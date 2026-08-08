import fs from "fs";
import sharp from "sharp";
import { ImageUtils } from "./utils";

const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);
const toImageImportLine = (fileNames: string[]) =>
  fileNames.map(
    (file) =>
      `import ${(file.split(".") as [string, string])[0]
        .split("-")
        .map((word) => capitalize(word))
        .join("")} from './media/${file}'`,
  );

const start = async () => {
  sharp.cache(false);
  const imageRegex = /\.(jpg|jpeg|png|webp|gif|avif)$/i;
  const directoryPath =
    "/Users/ctb/Programming/VisionAutoGlass/client/src/assets/media";
  try {
    let allFiles = fs.readdirSync(directoryPath);
    const files = allFiles.filter((fileName) => imageRegex.test(fileName));

    for await (let file of files) {
      const [fileName, fileEnding] = file.split(".") as [string, string];
      if (fileEnding === "webp") continue;
      await sharp(ImageUtils.join(directoryPath, file))
        .resize(500, 500, { fit: "inside" })
        .toFormat("webp")
        .webp({ quality: 80 })
        .toFile(ImageUtils.join(directoryPath, fileName) + "." + "webp");

      fs.rmSync(ImageUtils.join(directoryPath, file));
    }

    console.log("All files before:", allFiles);
    console.log(``);

    allFiles = fs.readdirSync(directoryPath);
    console.log("All files after:", allFiles);
    console.log(``);

    console.log(
      toImageImportLine(files)
        .join("\n")
        .replaceAll("jpg", "webp")
        .replaceAll("jpeg", "webp")
        .replaceAll("png", "webp"),
    );
  } catch (err) {
    console.error("Error:", err);
  }
};

start();
