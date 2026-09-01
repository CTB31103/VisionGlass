import {
  Divider,
  EditDeleteButtons,
  Icons,
  MyChip,
  SmallSquareUser,
  TBody,
  THeading,
} from "@/components";
import { CSS, ROUTES } from "@/Constants";
import { useIsAdminService } from "@/hooks";
import { UserType, type IUser } from "@/interfaces";
import { Link, Stack } from "@mui/material";
import { capitalize } from "lodash";

type TeamMemberCardProps = {
  user: IUser;
  onClick?: () => void;
};

export const TeamMemberCard = ({ user, onClick }: TeamMemberCardProps) => {
  const isAdmin = useIsAdminService();

  const userTypeIcon =
    user.userType === UserType.ADMIN
      ? Icons.User
      : user.userType === UserType.SALES
        ? Icons.Sales
        : Icons.Tools;

  return (
    <Stack spacing={4} sx={{ width: "100%" }}>
      <Stack sx={{ width: "100%", position: "relative" }}>
        <Link
          underline="none"
          color="inherit"
          href={ROUTES.PROFILE + `/${user.userId}`}
        >
          <Stack
            direction={"row"}
            sx={{
              width: "100%",
              alignItems: "center",
              cursor: "pointer",

              "&:hover": { color: CSS.colors.blue },
            }}
            onClick={onClick}
            spacing={2}
          >
            <SmallSquareUser />

            <Stack sx={{ width: "100%", height: "100%" }} spacing={2}>
              <Stack sx={{ width: "100%" }} direction={"row"}>
                <Stack sx={{ width: "100%" }}>
                  <Stack
                    direction={"row"}
                    spacing={1}
                    sx={{
                      alignItems: "center",
                    }}
                  >
                    <Icons.Sales sx={{}} />
                    <THeading>{`${user.info.firstName} ${user.info.lastName}`}</THeading>
                  </Stack>
                  <TBody color={CSS.colors.black} medium>
                    {user.info.email}
                  </TBody>
                  <TBody color={CSS.colors.black} medium>
                    {user.info.phone}
                  </TBody>
                </Stack>
              </Stack>

              <Stack sx={{ width: "100%" }} direction={"row"} spacing={1}>
                <MyChip Icon={userTypeIcon} text={capitalize(user.userType)} />
              </Stack>
            </Stack>
          </Stack>
        </Link>

        <Stack
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 1,
            pointerEvents: "all",
          }}
        >
          {isAdmin && user.username !== "admin" && (
            <EditDeleteButtons
              editHref={ROUTES.TEAM_EDIT + `/${user.userId}`}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          )}
        </Stack>
      </Stack>

      <Divider />
    </Stack>
  );
};
