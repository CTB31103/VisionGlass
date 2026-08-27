import {
  DateTextInput,
  Filters,
  FullPage,
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
import { capitalize, toNearestHalfHour } from "@/utils";

export const Customers = () => {
  const {
    snackbar: [_, errorSnack],
    customerQuoteRoutes,
    userRoutes,
  } = useApi();

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");
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
      status: status !== "" ? (status as ICustomerQuote["status"]) : undefined,
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

  // const filterQuotes = () => {
  //   setFilteredQuotes(
  //     allQuotes.filter((quote) => {
  //       if (status.length > 0 && status !== "All") {
  //         if (quote.status !== status) return false;
  //       }

  //       if (employee.length > 0) {
  //         if (!quote.teamMembers.includes(employee)) return false;
  //       }

  //       if (scheduledDate) {
  //         if (
  //           !quote.meetingTime ||
  //           toReadableDate(new Date(quote.meetingTime.from), false) !==
  //             toReadableDate(scheduledDate, false)
  //         )
  //           return false;
  //       }

  //       return true;
  //     }),
  //   );
  // };

  useTimeoutEffect(
    () => {
      getAllEmployees();
    },
    [],
    50,
  );

  useTimeoutEffect(
    () => {
      if (search.length !== 0) return;

      getCustomersByPage();
    },
    [search, status, employee, scheduledDate?.getTime()],
    // []
    50,
  );

  // useEffect(() => {
  //   filterQuotes();
  // }, [
  //   toString(allQuotes.map((q) => q.customerQuoteId)),
  //   status,
  //   employee,
  //   scheduledDate?.getTime(),
  // ]);

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
          <SelectInput
            label="Status:"
            selectedItem={status}
            onSelect={setStatus}
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
