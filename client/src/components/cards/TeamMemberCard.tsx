import { Link, Stack } from "@mui/material";
import { SmallSquareUser } from "../shapes";
import type { IUser } from "@/interfaces";
import { CSS } from "@/Constants";
import { TBody } from "../typography";
import { capitalize } from "@/utils";

type TeamMemberCardProps = {
  user: IUser;
  href?: string;
  onClick?: () => void;
};

export const TeamMemberCard = ({
  user,
  href,
  onClick,
}: TeamMemberCardProps) => {
  const fullName = `${user.info.firstName} ${user.info.lastName}`.trim();
  return (
    <Link color="inherit" href={href} underline="none">
      <Stack
        onClick={onClick}
        sx={{
          p: 2,

          borderWidth: 1,
          borderColor: CSS.colors.black,
          borderRadius: 5,

          alignItems: "center",
          justifyContent: "center",

          cursor: onClick || href ? "pointer" : undefined,

          "&:hover":
            onClick || href
              ? {
                  borderColor: CSS.colors.blue,
                  borderWidth: 2,

                  color: CSS.colors.blue,
                }
              : undefined,
        }}
      >
        <SmallSquareUser noBorder colorInherit />

        <TBody bold medium>
          {fullName}
        </TBody>
        {/* <TBody>{user.username}</TBody> */}
        <TBody opacity={0.5}>({capitalize(user.userType)})</TBody>
      </Stack>
    </Link>
  );
};
