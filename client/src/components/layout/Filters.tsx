import { Link, Stack } from "@mui/material";
import { type PropsWithChildren } from "react";
import { TBody } from "../typography";
import { SearchBar } from "../inputs";
import { ActionButton } from "../buttons";
import { Icons } from "../icons";

type FiltersProps = {
  searchBar?: string;
  setSearchBar?: (v: string) => void;
  onSearch?: () => void;

  btnText?: string;
  btnLink?: string;
  onBtnClick?: () => void;
};

export const Filters = ({
  children,
  searchBar,
  setSearchBar = () => {},
  onSearch,
  btnText,
  btnLink,
  onBtnClick,
}: PropsWithChildren<FiltersProps>) => {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {searchBar !== undefined && (
        <SearchBar
          value={searchBar}
          setValue={setSearchBar}
          onSearch={onSearch}
        />
      )}

      <Stack spacing={1} sx={{ width: "100%" }}>
        <TBody bold>Filters:</TBody>
        <Stack
          spacing={1}
          direction={"row"}
          sx={{ width: "100%", justifyContent: "space-between" }}
        >
          {children}
        </Stack>
      </Stack>

      {btnText && (
        <Stack direction={"row"} sx={{ justifyContent: "end", width: "100%" }}>
          <Link href={btnLink}>
            <ActionButton color="red" onClick={onBtnClick}>
              {btnText} <Icons.Add />
            </ActionButton>
          </Link>
        </Stack>
      )}
    </Stack>
  );
};
