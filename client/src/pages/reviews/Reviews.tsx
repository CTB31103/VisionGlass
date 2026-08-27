import {
  DateTextInput,
  Filters,
  FullPage,
  Icons,
  NoDataFound,
  PageHeader,
  PaginationControl,
  SelectInput,
} from "@/components";
import { Stack } from "@mui/material";
import { ReviewCard } from "./ReviewCard";
import {
  useApi,
  usePaginatedState,
  useTimeoutEffect,
  type IPaginationOptions,
  type IPaginationResult,
} from "@/hooks";
import type { IReview } from "@/interfaces";
import {
  DEFAULT_PAGINATION_LIMIT_OPTIONS,
  DEFAULT_PAGINATION_OPTION,
} from "@/Constants";
import { useState } from "react";
import { toMidnight } from "@/utils";

export const Reviews = () => {
  const {
    snackbar: [_, errorSnack],
    reviewRoutes,
  } = useApi();
  const [loading, setLoading] = useState(false);

  const {
    docs: [allReviews, setAllReviews],
    totalDocs: [totalReviews, setTotalReviews],
    pageNumber,
    setPageNumber,
    pageLimit,
    setPageLimit,
    totalPages,
    setTotalPages,
  } = usePaginatedState<IReview>();

  const [searchQuery, setSearchQuery] = useState("");

  const [sortBy, setSortBy] = useState("");
  const [from, setFrom] = useState<Date | undefined>(undefined);
  const [to, setTo] = useState<Date | undefined>(undefined);
  const [rangeError, setRangeError] = useState<[string, string]>(["", ""]);

  const availableSortBy = [
    "",
    "Rating - High/Low",
    "Rating - Low/High",
    "First Name",
    "Last Name",
    "Earliest First",
    "Most Recent First",
  ];

  const setAPISearchResult = (
    data: {
      reviews: IReview[];
    } & IPaginationResult,
  ) => {
    setAllReviews(data.reviews);
    setPageNumber(data.page);
    setPageLimit(data.pageLimit);
    setTotalPages(data.totalPages);
    setTotalReviews(data.total);
  };

  const buildDateRange = () => {
    setRangeError(["", ""]);
    if (!from && !to) return {};
    if (from && !to) {
      setRangeError(["", "Required when 'From' not empty"]);
      return {};
    }
    if (!from && to) {
      setRangeError(["Required when 'To' not empty", ""]);
      return {};
    }
    return {
      from: toMidnight(from!).getTime(),
      to: toMidnight(to!).getTime(),
    };
  };

  const getReviews = async (
    paginationOptions: IPaginationOptions = DEFAULT_PAGINATION_OPTION,
  ) => {
    setLoading(true);

    const fromTo = buildDateRange();

    const res = await reviewRoutes.getReviews({
      ...paginationOptions,
      ...fromTo,
      sortBy: sortBy.length > 0 ? sortBy : undefined,
      query: searchQuery.length > 0 ? searchQuery : undefined,
    });
    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    setAPISearchResult(res.data);
  };

  // useEffect(() => {
  //   setSortedReviews(
  //     [...allReviews].sort((a, b) => {
  //       if (sortBy === "Rating - High/Low") return b.rating - a.rating;
  //       if (sortBy === "Rating - Low/High") return a.rating - b.rating;
  //       if (sortBy === "First Name")
  //         return a.person.firstName.localeCompare(b.person.firstName);
  //       if (sortBy === "Last Name")
  //         return a.person.lastName.localeCompare(b.person.lastName);
  //       if (sortBy === "Creation Date") return a.createdOn - b.createdOn;

  //       return 0;
  //     }),
  //   );
  // }, [toString(allReviews.map((rev) => rev.reviewId)), sortBy]);

  useTimeoutEffect(
    () => {
      if (searchQuery.length !== 0) return;

      getReviews();
    },
    [sortBy, searchQuery],
    50,
  );

  useTimeoutEffect(() => {
    const dateRange = buildDateRange();

    if (!from && !to) return;

    if (dateRange.from && dateRange.to) getReviews();
  }, [from?.getTime(), to?.getTime()]);

  return (
    <FullPage screen>
      <Stack
        sx={{ width: "100%", paddingBlock: 4, paddingInline: 8 }}
        spacing={4}
      >
        <PageHeader text="Reviews" />

        <Filters
          searchBar={searchQuery}
          setSearchBar={setSearchQuery}
          onSearch={() => getReviews()}
        >
          <SelectInput
            label="Sort By:"
            selectedItem={sortBy}
            onSelect={setSortBy}
            items={availableSortBy.map((item) => ({
              value: item,
              text: item.length === 0 ? "None" : item,
            }))}
          />
          <DateTextInput
            label="From:"
            placeholder="mm/dd/yyyy"
            date={from}
            setDate={setFrom}
            endIcon={<Icons.Calendar />}
            error={rangeError[0]}
            allowUndefinedSetter
            longYear
          />
          <DateTextInput
            label="To:"
            placeholder="mm/dd/yyyy"
            date={to}
            setDate={setTo}
            endIcon={<Icons.Calendar />}
            error={rangeError[1]}
            allowUndefinedSetter
            longYear
          />
        </Filters>

        <Stack sx={{ width: "100%" }} spacing={4}>
          {loading || allReviews.length === 0 ? (
            <NoDataFound loading={loading} />
          ) : (
            allReviews.map((review, i, arr) => (
              <ReviewCard
                key={i}
                review={review}
                divider={i !== arr.length - 1}
              />
            ))
          )}
        </Stack>

        <PaginationControl
          page={pageNumber}
          onNextPage={
            pageNumber !== totalPages
              ? () => getReviews({ pageLimit, pageNumber: pageNumber + 1 })
              : undefined
          }
          onPrevPage={
            pageNumber > 1
              ? () => getReviews({ pageLimit, pageNumber: pageNumber - 1 })
              : undefined
          }
          totalCount={totalReviews}
          totalPage={totalPages}
          pageLimit={{
            value: pageLimit,
            set: (value) => getReviews({ pageLimit: value, pageNumber: 1 }),
            available: DEFAULT_PAGINATION_LIMIT_OPTIONS,
          }}
        />
      </Stack>
    </FullPage>
  );
};
