import {
  Filters,
  FullPage,
  Icons,
  PageHeader,
  SelectInput,
  TextInput,
} from "@/components";
import { Stack } from "@mui/material";
import { ReviewCard } from "./ReviewCard";

export const Reviews = () => {
  return (
    <FullPage screen>
      <Stack
        sx={{ width: "100%", paddingBlock: 4, paddingInline: 8 }}
        spacing={4}
      >
        <PageHeader text="Reviews" />

        <Filters searchBar="" setSearchBar={() => {}}>
          <SelectInput
            label="Sort By:"
            selectedItem=""
            onSelect={() => {}}
            items={[]}
          />
          <TextInput
            label="From:"
            placeholder="mm/dd/yyyy"
            value={""}
            setValue={() => {}}
            endIcon={<Icons.Calendar />}
          />
          <TextInput
            label="To:"
            placeholder="mm/dd/yyyy"
            value={""}
            setValue={() => {}}
            endIcon={<Icons.Calendar />}
          />
        </Filters>

        <Stack sx={{ width: "100%" }} spacing={4}>
          <ReviewCard />
        </Stack>
      </Stack>
    </FullPage>
  );
};
