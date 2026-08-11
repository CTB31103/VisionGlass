import type { InputProps } from "./types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { InputField } from "./InputField";

type MultiSelectInput = InputProps & {
  items: { text?: string; value: string }[];
  selectedItems?: string[];
  onSelect: (value: string[]) => void;
};

export const MultiSelectInput = (props: MultiSelectInput) => {
  const { label, items, selectedItems = [], onSelect, required } = props;

  const id = label.replaceAll(" ", "");

  return (
    <InputField {...props}>
      <FormControl required={required} fullWidth>
        <InputLabel id={`${id}-label`}>{label}</InputLabel>
        <Select
          multiple={true}
          labelId={`${id}-label`}
          id={`${id}-select`}
          value={selectedItems as unknown as string}
          label={label}
          onChange={({ target: { value } }: SelectChangeEvent) =>
            onSelect(typeof value === "string" ? value.split(",") : value)
          }
        >
          {items.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.text ?? item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </InputField>
  );
};
