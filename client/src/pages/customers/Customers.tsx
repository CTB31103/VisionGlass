import {
  DateTextInput,
  Filters,
  FullPage,
  MultiSelectInput,
  NoDataFound,
  PageHeader,
  PaginationControl,
  SelectInput,
} from "@/components";
import {
  CUSTOMER_QUOTE_STATUS,
  type ICustomerQuote,
  type IUser,
} from "@/interfaces";
import { Stack } from "@mui/material";
import { useState } from "react";
import { CustomerItem } from "./CustomerItem";
import {
  DEFAULT_PAGINATION_LIMIT_OPTIONS,
  DEFAULT_PAGINATION_OPTION,
  ROUTES,
} from "@/Constants";
import {
  useApi,
  usePaginatedState,
  useTimeoutEffect,
  type IPaginationOptions,
  type IPaginationResult,
} from "@/hooks";
import { capitalize, toNearestHalfHour, toString } from "@/utils";
import { useLocation } from "react-router";
import queryString from "query-string";

export const Customers = () => {
  const location = useLocation();
  const {
    snackbar: [_, errorSnack],
    customerQuoteRoutes,
    userRoutes,
  } = useApi();

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState([""]);
  const [employee, setEmployee] = useState("");
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(
    undefined,
  );

  const {
    docs: [allQuotes, setAllQuotes],
    totalDocs: [totalQuotes, setTotalQuotes],
    pageNumber,
    setPageNumber,
    pageLimit,
    setPageLimit,
    totalPages,
    setTotalPages,
  } = usePaginatedState<ICustomerQuote>();

  const [allEmployees, setAllEmployees] = useState<IUser[]>([]);

  const availableStatus = [...CUSTOMER_QUOTE_STATUS];

  const setAPISearchResult = ({
    customerQuotes,
    page,
    pageLimit,
    total,
    totalPages,
  }: { customerQuotes: ICustomerQuote[] } & IPaginationResult) => {
    setAllQuotes(customerQuotes);
    setPageNumber(page);
    setPageLimit(pageLimit);
    setTotalPages(totalPages);
    setTotalQuotes(total);
  };

  const getCustomersByPage = async (
    paginationOptions: IPaginationOptions = DEFAULT_PAGINATION_OPTION,
  ) => {
    setLoading(true);

    const res = await customerQuoteRoutes.getAllCustomers({
      ...paginationOptions,
      status:
        status.length >= 1 && status[0] !== ""
          ? (status as ICustomerQuote["status"][])
          : undefined,
      employee: employee.length > 0 ? employee : undefined,
      scheduledDate: scheduledDate ? scheduledDate.getTime() : undefined,
    });
    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    setAPISearchResult(res.data);
  };

  const getAllEmployees = async () => {
    setLoading(true);

    const res = await userRoutes.getAllUsers();
    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    setAllEmployees(res.data.users);
  };

  useTimeoutEffect(
    () => {
      getAllEmployees();
    },
    [],
    50,
  );

  useTimeoutEffect(
    () => {
      const searchParams = queryString.parse(location.search);

      if (searchParams["status"] !== undefined) {
        const pStatus = searchParams["status"];
        if (Array.isArray(pStatus)) {
          setStatus(pStatus as string[]);
        } else if (typeof pStatus === "string") {
          setStatus([pStatus]);
        }
      }

      if (
        typeof searchParams["employee"] === "string" &&
        (searchParams["employee"] as string).length > 0
      ) {
        const pEmployee = searchParams["employee"];
        setEmployee(pEmployee);
      }

      if (searchParams) console.log(toString(searchParams));
      console.log(``);
    },
    [toString(location)],
    50,
  );

  useTimeoutEffect(
    () => {
      if (search.length !== 0) return;

      getCustomersByPage();
    },
    [search, status, employee, scheduledDate?.getTime()],
    50,
  );

  const onSearch = async () => {
    setLoading(true);

    const res = await customerQuoteRoutes.search(search);
    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    setAPISearchResult(res.data);
  };

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
          onSearch={onSearch}
          btnText="New Customer"
          btnLink={ROUTES.CUSTOMERS_ADD}
        >
          <MultiSelectInput
            label="Status:"
            selectedItems={status}
            onSelect={(val) =>
              val.includes("") && val[val.length - 1] === ""
                ? setStatus([""])
                : val.length > 1 && val[0] === ""
                  ? setStatus(val.filter((v) => v.length !== 0))
                  : setStatus(val)
            }
            items={[{ value: "", text: "All" }].concat(
              availableStatus.map((value) => ({
                value,
                text: value
                  .replaceAll("_", " ")
                  .split(" ")
                  .map((v) => capitalize(v))
                  .join(" "),
              })),
            )}
          />
          {allEmployees.length > 0 ? (
            <SelectInput
              label="Employee:"
              selectedItem={employee}
              onSelect={setEmployee}
              items={[{ value: "", text: "Any" }].concat(
                allEmployees.map((employee) => ({
                  value: employee.userId,
                  text: `${employee.info.firstName} ${employee.info.lastName}`,
                })),
              )}
            />
          ) : (
            <Stack sx={{ flex: 1 }} />
          )}
          <DateTextInput
            label="Scheduled Date:"
            date={scheduledDate}
            setDate={setScheduledDate}
            allowUndefinedSetter
            onCalendar={() => setScheduledDate(toNearestHalfHour(new Date()))}
          />
        </Filters>

        <Stack sx={{ width: "100%" }} spacing={4}>
          {loading || allQuotes.length === 0 ? (
            <NoDataFound
              loading={loading}
              message={
                allQuotes.length > 0
                  ? "No customers found that match selected filters"
                  : undefined
              }
            />
          ) : (
            allQuotes.map((quote, i, arr) => (
              <CustomerItem
                key={i}
                href={ROUTES.CUSTOMERS + `/${quote.customerQuoteId}`}
                title={`Customer: ${quote.customer.firstName} ${quote.customer.lastName}`}
                status={quote.status}
                divider={i !== arr.length - 1}
                employees={allEmployees.filter((e) =>
                  quote.teamMembers.includes(e.userId),
                )}
              />
            ))
          )}
        </Stack>

        <PaginationControl
          page={pageNumber}
          totalPage={totalPages}
          totalCount={totalQuotes}
          onNextPage={
            pageNumber !== totalPages && !loading
              ? () =>
                  getCustomersByPage({ pageLimit, pageNumber: pageNumber + 1 })
              : undefined
          }
          onPrevPage={
            pageNumber > 1 && !loading
              ? () =>
                  getCustomersByPage({ pageLimit, pageNumber: pageNumber - 1 })
              : undefined
          }
          pageLimit={{
            value: pageLimit,
            set: (newPageLimit) =>
              getCustomersByPage({ pageLimit: newPageLimit, pageNumber: 1 }),
            available: DEFAULT_PAGINATION_LIMIT_OPTIONS,
          }}
        />
      </Stack>
    </FullPage>
  );
};
