import {
  Filters,
  FullPage,
  Icons,
  PageHeader,
  SelectInput,
  TextInput,
} from "@/components";
import { CUSTOMER_QUOTE_STATUS } from "@/interfaces";
import { Stack } from "@mui/material";
import { useState } from "react";
import { CustomerItem } from "./CustomerItem";
import { ROUTES } from "@/Constants";

export const Customers = () => {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");
  const [employee, setEmployee] = useState("");
  const [dateStr, setDateStr] = useState("");

  const availableStatus = ["All", ...CUSTOMER_QUOTE_STATUS];

  return (
    <FullPage screen>
      <Stack
        sx={{ width: "100%", paddingBlock: 4, paddingInline: 8 }}
        spacing={4}
      >
        <PageHeader text="Customers" />

        <Filters
          searchBar={search}
          setSearchBar={setSearch}
          btnText="New Customer"
          btnLink={ROUTES.TEAM_ADD}
        >
          <SelectInput
            label="Status:"
            selectedItem={status}
            onSelect={setStatus}
            items={availableStatus.map((value) => ({ value }))}
          />
          <SelectInput
            label="Employee:"
            selectedItem={employee}
            onSelect={setEmployee}
            items={[]}
          />
          <TextInput
            label="Date:"
            placeholder="mm/dd/yyyy"
            value={dateStr}
            setValue={setDateStr}
            endIcon={<Icons.Calendar />}
          />
        </Filters>

        <Stack sx={{ width: "100%" }}>
          <CustomerItem
            title="Customer: John Doe"
            status="insurance_validated"
          />
        </Stack>
      </Stack>
    </FullPage>
  );
};
