import { CSS, ROUTES } from "@/Constants";
import { useAuthImage, useHoverable } from "@/hooks";
import type { IAttatchment, IUser } from "@/interfaces";
import { Link, Stack } from "@mui/material";
import { IconButton } from "../buttons";
import { Icons } from "../icons";
import { TBody, TEXT_SIZES } from "../typography";

import clsx from "clsx";

type AttatchmentCardProps = {
  customerId: string;
  attatchment: IAttatchment;

  user?: IUser;

  onDelete?: () => void;
};

export const AttatchmentCard = ({
  customerId,
  attatchment,

  user,

  onDelete,
}: AttatchmentCardProps) => {
  const { isHovered, register } = useHoverable();
  const { isHovered: isIconHovered, register: registerIcon } = useHoverable();

  const imageSrc = useAuthImage(attatchment.attachmentId);

  return (
    <Stack {...register}>
      <Link
        underline="none"
        color="inherit"
        href={ROUTES.CUSTOMERS_ATTATCHMENT(
          customerId,
          attatchment.attachmentId,
        )}
      >
        <Stack spacing={2}>
          <Stack
            sx={{
              position: "relative",
              width: 200,
              height: 300,
              overflow: "hidden",
              borderRadius: 5,

              cursor: "pointer",

              ...(isHovered || isIconHovered
                ? {
                    borderWidth: 4,
                    borderColor: CSS.colors.blue,
                  }
                : {}),
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              className={clsx(
                "transition-[scale] duration-150",
                isHovered || isIconHovered ? "scale-100" : "scale-125",
              )}
              src={imageSrc}
              alt={attatchment.attachmentId}
            />

            {isHovered && onDelete && (
              <Stack
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  alignItems: "end",
                  zIndex: 2,
                }}
              >
                <Stack
                  className="transition-[scale] duration-150"
                  sx={{ scale: isIconHovered ? 1.15 : 1 }}
                  {...registerIcon}
                  onClick={onDelete}
                >
                  <IconButton
                    fontSize={TEXT_SIZES.large}
                    borderColor={CSS.colors.red}
                    bgcolor={CSS.colors.white}
                    Icon={Icons.Delete}
                    color={CSS.colors.red}
                  />
                </Stack>
              </Stack>
            )}
          </Stack>

          {user && (
            <Stack spacing={0}>
              <TBody smaller bold opacity={0.5}>
                Added By:
              </TBody>
              <TBody bold>{user.username}</TBody>
            </Stack>
          )}
        </Stack>
      </Link>
    </Stack>
  );
};
