import { Stack } from "@mui/material";
import { ActionButton } from "../buttons";
import { Icons } from "../icons";
import { TextInput } from "./TextInput";

type SearchBarProps = {
  value: string;
  setValue: (v: string) => void;

  label?: string;
  onSearch?: () => void;
};

export const SearchBar = ({
  value,
  setValue,
  label = "Search:",
  onSearch,
}: SearchBarProps) => {
  return (
    <Stack
      direction={"row"}
      sx={{ width: "100%", alignItems: "center" }}
      spacing={2}
    >
      <Stack sx={{ width: "100%" }}>
        <TextInput
          label={label}
          value={value}
          setValue={setValue}
          keyMappings={onSearch ? { Enter: onSearch } : undefined}
        />
      </Stack>
      <ActionButton color="blue" onClick={onSearch}>
        <Icons.Search />
      </ActionButton>
    </Stack>
  );
};
