import {
  Filters,
  FullPage,
  NoDataFound,
  PageHeader,
  PaginationControl,
  SelectInput,
} from "@/components";
import {
  DEFAULT_PAGINATION_LIMIT_OPTIONS,
  DEFAULT_PAGINATION_OPTION,
  ROUTES,
} from "@/Constants";
import { Stack } from "@mui/material";
import { TeamMemberCard } from "./TeamMemberCard";
import { useState } from "react";
import { USER_TYPES, type IUser } from "@/interfaces";
import {
  useApi,
  useIsAdminService,
  usePaginatedState,
  useRefreshEffect,
  useScreenSize,
  type IPaginationResult,
} from "@/hooks";
import { capitalize } from "@/utils";

export const Team = () => {
  const {
    snackbar: { errorSnack },
    userRoutes: { getAllUsers, deleteUser },
  } = useApi();
  const isAdmin = useIsAdminService();

  const { lessThanEqualTo } = useScreenSize();

  const availableRoles = [
    "",
    ...USER_TYPES.slice(isAdmin ? 0 : 1, USER_TYPES.length),
  ];
  const availableSortBy = ["", "First Name", "Last Name", "Email", "Position"];

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [role, setRole] = useState("");
  const {
    docs: [users, setUsers],
    totalDocs: [totalUsers, setTotalUsers],
    totalPages,
    setTotalPages,
    pageLimit,
    setPageLimit,
    pageNumber,
    setPageNumber,
  } = usePaginatedState<IUser>({ initialData: [] });

  const setAPISearchResult = ({
    users,
    page,
    pageLimit,
    total,
    totalPages,
  }: { users: IUser[] } & IPaginationResult) => {
    setUsers(users);
    setPageNumber(page);
    setPageLimit(pageLimit);
    setTotalPages(totalPages);
    setTotalUsers(total);
  };

  const getPageUsers = async (
    paginationOptions = DEFAULT_PAGINATION_OPTION,
  ) => {
    setLoading(true);

    const res = await getAllUsers({
      ...paginationOptions,
      role: role.length > 0 ? role : undefined,
      sortBy: sortBy.length > 0 ? sortBy : undefined,
    });
    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);
    setAPISearchResult(res.data);
  };

  const onSearchUsers = async (
    paginationOptions = DEFAULT_PAGINATION_OPTION,
  ) => {
    if (search.length === 0) return getPageUsers(paginationOptions);
    setLoading(true);

    const res = await getAllUsers({
      ...paginationOptions,
      query: search,
      role: role.length > 0 ? role : undefined,
      sortBy: sortBy.length > 0 ? sortBy : undefined,
    });
    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);
    setAPISearchResult(res.data);
  };

  const getUsersSearchOrAll = (
    paginationOptions = DEFAULT_PAGINATION_OPTION,
  ) =>
    search.length > 0
      ? onSearchUsers(paginationOptions)
      : getPageUsers(paginationOptions);

  useRefreshEffect(() => {
    if (!loading) getUsersSearchOrAll();
  }, [sortBy, role]);

  const onDelete = async (userId: string) => {
    setLoading(true);

    const res = await deleteUser(userId);
    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    // navigate(ROUTES.TEAM);
    getUsersSearchOrAll();
  };

  return (
    <FullPage>
      <Stack
        sx={{
          width: "100%",
          paddingBlock: lessThanEqualTo.md ? 6 : 4,
          paddingInline: lessThanEqualTo.xs ? 2 : 8,
          pb: lessThanEqualTo.md ? 2 : undefined,
        }}
        spacing={4}
      >
        <PageHeader text="Team Members" />

        <Filters
          searchBar={search}
          setSearchBar={setSearch}
          onSearch={onSearchUsers}
          btnText={isAdmin ? "Add Team Member" : undefined}
          btnLink={ROUTES.TEAM_ADD}
        >
          <SelectInput
            label="Sort By"
            selectedItem={sortBy}
            onSelect={setSortBy}
            items={availableSortBy.map((s) => ({
              value: s,
              text: s.length === 0 ? "None" : capitalize(s),
            }))}
          />
          <Stack sx={{ width: "100%" }} />
          <SelectInput
            label="Role"
            selectedItem={role}
            onSelect={setRole}
            items={availableRoles.map((s) => ({
              value: s,
              text: s.length === 0 ? "Any" : capitalize(s),
            }))}
          />
        </Filters>

        <Stack sx={{ width: "100%" }} spacing={4}>
          {loading || users.length === 0 ? (
            <NoDataFound loading={loading} />
          ) : (
            users.map((user, i) => (
              <TeamMemberCard
                key={i}
                user={user}
                onDelete={() => onDelete(user.userId)}
              />
            ))
          )}
        </Stack>

        <PaginationControl
          page={pageNumber}
          totalPage={totalPages}
          totalCount={totalUsers}
          onNextPage={
            pageNumber !== totalPages && !loading
              ? () =>
                  getUsersSearchOrAll({ pageLimit, pageNumber: pageNumber + 1 })
              : undefined
          }
          onPrevPage={
            pageNumber > 1 && !loading
              ? () =>
                  getUsersSearchOrAll({ pageLimit, pageNumber: pageNumber - 1 })
              : undefined
          }
          pageLimit={{
            value: pageLimit,
            set: (newPageLimit) =>
              getUsersSearchOrAll({ pageLimit: newPageLimit, pageNumber: 1 }),
            available: DEFAULT_PAGINATION_LIMIT_OPTIONS,
          }}
        />
      </Stack>
    </FullPage>
  );
};
