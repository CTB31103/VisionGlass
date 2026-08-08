export type InputProps = {
  label: string;
  placeholder?: string;

  error?: string;
  helperText?: string;
  required?: boolean;
  optional?: boolean;
  orientation?: "horizontal" | "vertical";

  secure?: boolean;
};
