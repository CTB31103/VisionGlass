import { Stack } from "@mui/material";
import { BorderButton } from "../buttons";
import { Icons } from "../icons";
import { TBody } from "../typography";
import { SelectInput } from "../inputs";
import { DEFAULT_PAGINATION_LIMIT_OPTIONS } from "@/Constants";

type PaginationControlProps = {
  onNextPage?: () => void;
  onPrevPage?: () => void;

  pageLimit?: {
    value: number;
    set: (val: number) => void;
    available: number[];
  };

  page?: number;
  totalPage?: number;

  totalCount?: number;
};

export const PaginationControl = ({
  onNextPage,
  onPrevPage,
  pageLimit = {
    value: 5,
    set: () => {},
    available: DEFAULT_PAGINATION_LIMIT_OPTIONS,
  },
  page = 0,
  totalPage = 0,
  totalCount = 0,
}: PaginationControlProps) => {
  return (
    <Stack sx={{ position: "relative" }}>
      <Stack
        direction={"row"}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",

          paddingBlock: 2,
        }}
        spacing={2}
      >
        <Stack direction={"row"} sx={{ width: "20%", pointerEvents: "all" }}>
          <SelectInput
            label="Page Limit:"
            selectedItem={pageLimit.value.toString()}
            onSelect={(v) => pageLimit.set(parseInt(v))}
            items={pageLimit.available.map((num) => ({
              value: num.toString(),
            }))}
          />
        </Stack>

        <Stack direction={"row"} sx={{ width: "15%", justifyContent: "end" }}>
          <TBody>
            {totalCount < pageLimit.value * page
              ? totalCount
              : pageLimit.value * page}{" "}
            of {totalCount}
          </TBody>
        </Stack>
      </Stack>

      <Stack
        direction={"row"}
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,

          justifyContent: "center",
          alignItems: "center",

          pointerEvents: "none",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "center",
            alignItems: "center",

            pointerEvents: "all",
          }}
          spacing={2}
        >
          <BorderButton
            disabled={!onPrevPage}
            color={!onPrevPage ? "none" : "blue"}
            onClick={onPrevPage}
          >
            <Icons.ChevronLeft />
          </BorderButton>

          <TBody>
            {page} of {totalPage}
          </TBody>

          <BorderButton
            disabled={!onNextPage}
            color={!onNextPage ? "none" : "blue"}
            onClick={onNextPage}
          >
            <Icons.ChevronRight />
          </BorderButton>
        </Stack>
      </Stack>
    </Stack>
  );
};
