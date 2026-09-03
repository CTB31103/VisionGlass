import {
  ActionButton,
  NoDataFound,
  TeamMemberCard,
  THeading,
} from "@/components";
import { ROUTES } from "@/Constants";
import type { IUser } from "@/interfaces";
import { useUserStore } from "@/stores";
import { Stack } from "@mui/material";

type CustomerMembersProps = {
  teamMemberIds: string[];
  teamMembers: IUser[];
  loading?: boolean;

  onActionBtn?: () => void;
};

export const CustomerMembers = ({
  teamMemberIds,
  teamMembers,
  loading,

  onActionBtn,
}: CustomerMembersProps) => {
  const user = useUserStore((state) => state.user);
  return (
    <Stack spacing={2}>
      <Stack
        direction={"row"}
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <THeading>Associated Team Members</THeading>

        <ActionButton loading={loading} onClick={onActionBtn} color="red">
          {teamMemberIds.includes(user.userId) ? "Leave" : "Join"}
        </ActionButton>
        {/* TODO: Should user who has added an attatchment be able to remove themselves from working with customer */}
      </Stack>

      {teamMembers.length === 0 ? (
        <NoDataFound message="No team members associated with customer yet" />
      ) : (
        <Stack
          direction={"row"}
          spacing={4}
          sx={{ pb: 4, overflowX: "scroll" }}
        >
          {teamMembers.map((teamMember, i) => (
            <TeamMemberCard
              key={i}
              href={ROUTES.PROFILE + `/${teamMember.userId}`}
              user={teamMember}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
};
