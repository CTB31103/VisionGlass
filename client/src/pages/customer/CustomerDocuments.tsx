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
  Uploader,
} from "@/components";
import { CSS, MAX_FILE_SIZE, ONE_MB } from "@/Constants";
import { useApi, useUploaderState } from "@/hooks";
import type { IAttatchment, IUser } from "@/interfaces";
import { Stack } from "@mui/material";
import { useState } from "react";

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
  const {
    snackbar: [_, errorSnack],
    attatchmentRoutes,
  } = useApi();
  const [loading, setLoading] = useState(false);

  const uploadFiles = async (selectedFiles: File[]) => {
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

  const {
    inputRef,
    onFileSelect,
    setAutoUpload,
    resetFiles,
    selectedFiles,
    someFileTooLarge,
  } = useUploaderState(uploadFiles);

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

        <Uploader ref={inputRef} multipleFiles onFileSelect={onFileSelect} />
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
        subtitle={`${selectedFiles.length > 1 ? "One or more of your selected files is" : "Selected file is"} larger than 15 MB and cannot be uploaded.${selectedFiles.length > 1 ? " Do you want to upload the smaller files on their own?" : ""}`}
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
        {selectedFiles.length === 1 ? (
          <Stack sx={{ width: "100%", alignItems: "center" }}>
            <ActionButton onClick={resetFiles}>Close</ActionButton>
          </Stack>
        ) : (
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
        )}
      </BasicModal>
    </Stack>
  );
};
