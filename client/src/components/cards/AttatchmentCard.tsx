import { CONSTANTS, CSS, ROUTES } from "@/Constants";
import { useHoverable } from "@/hooks";
import type { IAttatchment } from "@/interfaces";
import { Link, Stack } from "@mui/material";
import { IconButton } from "../buttons";
import { Icons } from "../icons";
import { TEXT_SIZES } from "../typography";
import clsx from "clsx";

type AttatchmentCardProps = {
  customerId: string;
  attatchment: IAttatchment;

  onDelete?: () => void;
};

export const AttatchmentCard = ({
  customerId,
  attatchment,

  onDelete,
}: AttatchmentCardProps) => {
  const { isHovered, register } = useHoverable();
  const { isHovered: isIconHovered, register: registerIcon } = useHoverable();
  return (
    <Stack sx={{ position: "relative" }} {...register}>
      <Link
        underline="none"
        color="inherit"
        href={ROUTES.CUSTOMERS_ATTATCHMENT(
          customerId,
          attatchment.attachmentId,
        )}
      >
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
            src={CONSTANTS.api.image(attatchment.attachmentId)}
          />
        </Stack>
      </Link>

      {isHovered && onDelete && (
        <Stack
          sx={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            alignItems: "center",
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
  );
};
