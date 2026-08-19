// import { createListCollection, Portal, Select } from "@chakra-ui/react";
import { InputField } from "./InputField";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import type { InputProps } from "./types";

type SelectInputProps = InputProps & {
  items: { text?: string; value: string }[];
  selectedItem?: string;
  onSelect: (value: string) => void;
};

export const SelectInput = (props: SelectInputProps) => {
  const {
    label: parentlabel,
    items,
    selectedItem,
    onSelect,
    required,
    disabled,
    optional,
  } = props;

  const label = `${parentlabel}${optional ? ` (optional)` : ``}`;

  const id = label.replaceAll(" ", "");

  return (
    <InputField {...props}>
      <FormControl disabled={disabled} required={required} fullWidth>
        <InputLabel id={`${id}-label`}>{label}</InputLabel>
        <Select
          labelId={`${id}-label`}
          id={`${id}-select`}
          value={selectedItem}
          label={label}
          onChange={({ target: { value } }: SelectChangeEvent) =>
            onSelect(value)
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

  // return (
  //   <Select.Root
  //     collection={createListCollection({
  //       items: items.map((item) => item.value),
  //     })}
  //     value={selectedItems}
  //     onValueChange={(e) => onSelect(e.value)}
  //   >
  //     <Select.HiddenSelect />
  //     <Select.Label>{label}</Select.Label>
  //     <Select.Control>
  //       <Select.Trigger>
  //         <Select.ValueText placeholder={label} />
  //       </Select.Trigger>
  //       <Select.IndicatorGroup>
  //         <Select.Indicator />
  //       </Select.IndicatorGroup>
  //     </Select.Control>
  //     <Portal>
  //       <Select.Positioner>
  //         <Select.Content>
  //           {items.map((item) => (
  //             <Select.Item item={item} key={item.value}>
  //               {item.text}
  //               <Select.ItemIndicator />
  //             </Select.Item>
  //           ))}
  //         </Select.Content>
  //       </Select.Positioner>
  //     </Portal>
  //   </Select.Root>
  // );
};
