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
import { useScreenSize, useUserRestrictions } from "@/hooks";
import { UserType, type IUser } from "@/interfaces";
import { Link, Stack } from "@mui/material";
import { capitalize } from "lodash";
import { useNavigate } from "react-router";

type TeamMemberCardProps = {
  user: IUser;
  onClick?: () => void;
  onDelete?: () => void;
};

export const TeamMemberCard = ({
  user,
  onClick,
  onDelete,
}: TeamMemberCardProps) => {
  const navigate = useNavigate();
  const { lessThanEqualTo } = useScreenSize();
  const { authorized } = useUserRestrictions(user);

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
            direction={lessThanEqualTo.xs ? "column" : "row"}
            sx={{
              width: "100%",
              alignItems: "center",
              cursor: "pointer",

              "&:hover": { color: CSS.colors.blue },
            }}
            onClick={onClick}
            spacing={2}
          >
            {lessThanEqualTo.xs && (
              <Stack
                direction={"row"}
                sx={{
                  width: "100%",
                  justifyContent: "space-between",
                  pointerEvents: "all",
                }}
              >
                {authorized.edit ? (
                  <EditDeleteButtons
                    onEdit={
                      authorized.edit
                        ? (e) => (
                            e.preventDefault(),
                            e.stopPropagation(),
                            navigate(ROUTES.TEAM_EDIT + `/${user.userId}`)
                          )
                        : undefined
                    }
                  />
                ) : (
                  <Stack sx={{ width: "100%" }} />
                )}

                <EditDeleteButtons
                  onDelete={
                    authorized.delete
                      ? (e) => (
                          e.preventDefault(),
                          e.stopPropagation(),
                          onDelete && onDelete()
                        )
                      : undefined
                  }
                  redDelete
                />
              </Stack>
            )}

            <SmallSquareUser />

            <Stack sx={{ width: "100%", height: "100%" }} spacing={2}>
              <Stack sx={{ width: "100%" }} direction={"row"}>
                <Stack
                  sx={{
                    width: "100%",
                    alignItems: lessThanEqualTo.xs ? "center" : undefined,
                  }}
                >
                  <Stack
                    direction={"row"}
                    sx={{ justifyContent: "space-between", alignItems: "end" }}
                  >
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

                    {!lessThanEqualTo.xs && (
                      <EditDeleteButtons
                        editHref={
                          authorized.edit
                            ? ROUTES.TEAM_EDIT + `/${user.userId}`
                            : undefined
                        }
                        onDelete={authorized.delete ? onDelete : undefined}
                        redDelete
                      />
                    )}
                  </Stack>
                  <TBody color={CSS.colors.black} medium>
                    {user.info.email}
                  </TBody>
                  <TBody color={CSS.colors.black} medium>
                    {user.info.phone}
                  </TBody>
                </Stack>
              </Stack>

              <Stack
                sx={{
                  width: "100%",
                  justifyContent: lessThanEqualTo.xs ? "center" : undefined,
                }}
                direction={"row"}
                spacing={1}
              >
                <MyChip Icon={userTypeIcon} text={capitalize(user.userType)} />
              </Stack>
            </Stack>
          </Stack>
        </Link>
      </Stack>

      <Divider />
    </Stack>
  );
};
