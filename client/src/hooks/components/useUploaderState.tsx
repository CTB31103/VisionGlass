import { MAX_FILE_SIZE } from "@/Constants";
import React, { useEffect, useRef, useState } from "react";
import { useSnackbar } from "../utils";

export const useUploaderState = (
  uploaderFunc: (
    selectedFiles: File[],
    reset: () => void,
  ) => void | Promise<void>,
) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [_, errorSnack] = useSnackbar();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [someFileTooLarge, setSomeFileTooLarge] = useState(0);
  const [autoUpload, setAutoUpload] = useState(false);

  const onFileSelect = ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setSomeFileTooLarge(0);
    setAutoUpload(false);
    if (!files) return;

    const filesArr: File[] = [];
    let largeCounter = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (!file) continue;
      filesArr.push(file);

      if (file.size > MAX_FILE_SIZE) largeCounter += 1;
    }

    if (filesArr.length === 1 && largeCounter === 1)
      return errorSnack(`File size is larger 15 MB and cannot be uploaded.`);

    if (filesArr.length === largeCounter)
      return errorSnack(
        `File size of all selected files is larger than 15 MB and cannot be uploaded.`,
      );

    setSelectedFiles(filesArr);
    setSomeFileTooLarge(largeCounter);

    if (largeCounter === 0) {
      setAutoUpload(true);
    }
  };

  const resetFiles = () => {
    setAutoUpload(false);
    setSelectedFiles([]);
    setSomeFileTooLarge(0);
  };

  useEffect(() => {
    if (autoUpload && selectedFiles.length > 0)
      uploaderFunc(selectedFiles, resetFiles);
  }, [autoUpload]);

  return {
    inputRef,
    selectedFiles,
    someFileTooLarge,

    onFileSelect,
    resetFiles,
    setAutoUpload,
  };
};
