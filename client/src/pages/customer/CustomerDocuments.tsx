import {
  ActionButton,
  AttatchmentCard,
  BasicModal,
  BorderButton,
  Divider,
  Icons,
  NoDataFound,
  TBody,
  THeading,
} from "@/components";
import {
  ACCEPTABLE_IMAGE_TYPES,
  CSS,
  MAX_FILE_SIZE,
  ONE_MB,
} from "@/Constants";
import { useApi } from "@/hooks";
import type { IAttatchment, IUser } from "@/interfaces";
import { Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";

type CustomerDocumentsProps = {
  customerId: string;

  loading?: boolean;
  attatchments?: IAttatchment[];
  users?: IUser[];

  onAddDocumentIds: (documentIds: string[]) => void;
  onDeleteDocument?: (documentId: string) => void;
};

export const CustomerDocuments = ({
  customerId,
  loading: parentLoading,
  attatchments = [],
  users = [],
  onAddDocumentIds,
  onDeleteDocument,
}: CustomerDocumentsProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    snackbar: [_, errorSnack],
    attatchmentRoutes,
  } = useApi();
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [someFileTooLarge, setSomeFileTooLarge] = useState(0);
  const [autoUpload, setAutoUpload] = useState(false);

  const uploadFiles = async () => {
    if (selectedFiles.length === 0) return;
    setLoading(true);

    const formData = new FormData();

    for (const file of selectedFiles) {
      formData.append("files", file);
    }
    formData.append("isPrivate", "true");

    const res = await attatchmentRoutes.upload(formData);
    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    onAddDocumentIds(res.data.attatchments.map((doc) => doc.attachmentId));
  };

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

  useEffect(() => {
    if (autoUpload && selectedFiles.length > 0) uploadFiles();
  }, [autoUpload]);

  const resetFiles = () => {
    setSelectedFiles([]);
    setSomeFileTooLarge(0);
  };

  return (
    <Stack spacing={4} sx={{ pb: 4 }}>
      <Stack
        direction={"row"}
        sx={{
          position: "relative",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <THeading>Associated Documents</THeading>

        <ActionButton
          loading={parentLoading || loading}
          onClick={() => inputRef.current?.click()}
          EndIcon={<Icons.Upload />}
          color="red"
        >
          Add Document
        </ActionButton>

        <Stack
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          <input
            ref={inputRef}
            type="file"
            max={5}
            multiple
            accept={ACCEPTABLE_IMAGE_TYPES}
            onChange={onFileSelect}
          />
        </Stack>
      </Stack>

      {parentLoading || loading || attatchments.length === 0 ? (
        <NoDataFound message="No documents associated with customer yet" />
      ) : (
        <Stack
          direction={"row"}
          spacing={4}
          sx={{ pb: 4, overflowX: "scroll" }}
        >
          {attatchments.map((doc, i) => (
            <AttatchmentCard
              key={i}
              customerId={customerId}
              attatchment={doc}
              user={users.find((user) => user.userId === doc.createdBy)}
              onDelete={() =>
                onDeleteDocument && onDeleteDocument(doc.attachmentId)
              }
            />
          ))}
        </Stack>
      )}

      <BasicModal
        title="Warning"
        subtitle={`${"One or more of your"} selected files is larger than 15 MB and cannot be uploaded. Do you want to upload without the larger files?`}
        open={someFileTooLarge > 0}
        centerSubtitle
        onClose={() => {}}
      >
        <Stack
          sx={{
            width: "100%",
            maxHeight: "100%",
            overflowY: "scroll",
            paddingInline: 2,
            paddingBlock: 4,
          }}
          spacing={2}
        >
          {selectedFiles.map((file, i) => {
            const tooLarge = file.size > MAX_FILE_SIZE;
            return (
              <Stack
                key={i}
                spacing={2}
                sx={{
                  width: "100%",
                  color: tooLarge ? CSS.colors.red : undefined,
                }}
              >
                <Stack sx={{ width: "100%" }}>
                  <TBody bold>{file.name}</TBody>
                  <TBody smaller>
                    Size: {(file.size / ONE_MB).toFixed(2)}MB
                  </TBody>
                </Stack>
                <Divider />
              </Stack>
            );
          })}
        </Stack>
        <Stack
          direction={"row"}
          sx={{ width: "100%", justifyContent: "space-between" }}
        >
          <BorderButton onClick={resetFiles}>
            <Icons.Close /> Cancel
          </BorderButton>
          <ActionButton
            onClick={() => setAutoUpload(true)}
            EndIcon={<Icons.Upload />}
          >
            Upload
          </ActionButton>
        </Stack>
      </BasicModal>
    </Stack>
  );
};
