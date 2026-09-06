import { ACCEPTABLE_IMAGE_TYPES } from "@/Constants";
import { Stack } from "@mui/material";
import React, { forwardRef } from "react";

type UploaderProps = {
  multipleFiles?: boolean;
  onFileSelect: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
};

export const Uploader = forwardRef<HTMLInputElement, UploaderProps>(
  ({ onFileSelect, multipleFiles }, ref) => {
    return (
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
          ref={ref}
          type="file"
          max={multipleFiles ? 5 : 1}
          multiple={multipleFiles}
          accept={ACCEPTABLE_IMAGE_TYPES}
          onChange={onFileSelect}
        />
      </Stack>
    );
  },
);
