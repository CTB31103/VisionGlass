import {
  Filters,
  FullPage,
  PageHeader,
  SelectInput,
  TBody,
} from "@/components";
import { ROUTES } from "@/Constants";
import { Stack } from "@mui/material";
import { TeamMemberCard } from "./TeamMemberCard";
import { useEffect, useState } from "react";
import { USER_TYPES, type IUser } from "@/interfaces";
import { useApi, useIsAdminService, useTimeoutEffect } from "@/hooks";
import { capitalize, toString } from "@/utils";

export const Team = () => {
  const availableSortBy = ["", "First Name", "Last Name", "Email", "Position"];
  const availableRoles = ["", ...USER_TYPES];

  const {
    snackbar: { errorSnack },
    userRoutes: { getAllUsers, searchUsers },
  } = useApi();
  const isAdmin = useIsAdminService();

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [role, setRole] = useState("");
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  useTimeoutEffect(() => {
    const callback = async () => {
      setLoading(true);
      const res = await getAllUsers();
      setLoading(false);
      if (res.err || !res.data) return errorSnack(res.err);
      setAllUsers(res.data.users);
    };

    if (search.length === 0 && !loading) callback();
  }, [search]);

  useEffect(() => {
    if (allUsers.length === 0) return;
    setUsers(
      allUsers
        .filter((user) => (role.length === 0 ? true : user.userType === role))
        .sort((a, b) => {
          if (sortBy.length === 0) return 0;

          let fieldA;
          let fieldB;

          switch (sortBy) {
            case "Position":
              fieldA = a.userType;
              fieldB = b.userType;
              break;
            case "Email":
              fieldA = a.info.email;
              fieldB = b.info.email;
              break;
            case "Last Name":
              fieldA = a.info.lastName;
              fieldB = b.info.lastName;
              break;
            case "First Name":
            default:
              fieldA = a.info.firstName;
              fieldB = b.info.firstName;
          }

          return fieldA.localeCompare(fieldB);
        }),
    );
  }, [toString(allUsers), sortBy, role]);

  const onSearchUsers = async () => {
    if (search.length === 0) return;

    setLoading(true);
    const res = await searchUsers({ query: search });
    setLoading(false);
    if (res.err || !res.data) return errorSnack(res.err);
    setAllUsers(res.data.users);
  };

  return (
    <FullPage screen>
      <Stack
        sx={{
          width: "100%",
          paddingBlock: 4,
          paddingInline: 8,
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
              text: s.length === 0 ? "None" : capitalize(s),
            }))}
          />
        </Filters>

        <Stack sx={{ width: "100%" }} spacing={4}>
          {users.length === 0 ? (
            <Stack sx={{ width: "100%", alignItems: "center", pt: 8 }}>
              <TBody>No user was found to match choosen filters.</TBody>
            </Stack>
          ) : (
            users.map((user, i) => <TeamMemberCard key={i} user={user} />)
          )}
        </Stack>
      </Stack>
    </FullPage>
  );
};
