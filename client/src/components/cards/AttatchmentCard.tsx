import { CONSTANTS, CSS, ROUTES, TOKEN_KEYS } from "@/Constants";
import { useHoverable, useImageFetch } from "@/hooks";
import type { IAttatchment, IUser } from "@/interfaces";
import { Link, Stack } from "@mui/material";
import { IconButton } from "../buttons";
import { Icons } from "../icons";
import { TBody, TEXT_SIZES } from "../typography";
import ImageWithToken from "react-image-with-auth";
import { useAccessKeyStore } from "@/stores";
import { useEffect, useState } from "react";
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
  const accessKey = useAccessKeyStore((state) => state.accessKey);
  const { isHovered, register } = useHoverable();
  const { isHovered: isIconHovered, register: registerIcon } = useHoverable();

  const [headers, setHeaders] = useState<Record<string, string>>({});
  const imageSrc = useImageFetch(
    CONSTANTS.api.image(attatchment.attachmentId),
    { headers },
  );

  useEffect(() => {
    setHeaders(() => {
      const headers: Record<string, string> = {};

      headers[TOKEN_KEYS.API_KEY] = CONSTANTS.api.key();
      headers["Authorization"] = `Bearer ${accessKey}`;

      return headers;
    });
  }, [accessKey]);

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

            {/* <ImageWithToken
              imageUrl={CONSTANTS.api.image(attatchment.attachmentId)}
              alt={attatchment.attachmentId}
              className={clsx(
                "transition-[scale] duration-150",
                isHovered || isIconHovered ? "scale-100" : "scale-125",
              )}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              // headers={headers}
            /> */}

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
