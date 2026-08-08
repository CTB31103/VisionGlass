import { Link, Stack } from "@mui/material";
import React from "react";
import { TBody } from "../typography";
import { CSS } from "@/Constants";
import { useDimensions } from "@/hooks";
import { IMAGES } from "@/assets";
import clsx from "clsx";

type ServiceCardProps = {
  title: string;
  href?: string;
  url?: string;
};

export const ServiceCard = ({ title, href, url }: ServiceCardProps) => {
  const [rootRef, dimensions] = useDimensions();

  return (
    <Link href={href} underline="none">
      <Stack
        ref={rootRef}
        className={clsx(
          "hover:-translate-y-2.5 transition-[translate] duration-75",
          "border-2! border-black! hover:border-4!",
        )}
        sx={{
          borderRadius: 5,
          height: dimensions.width,
          backgroundImage: url ? `url(${url})` : "unset",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <Stack
          sx={{
            bgcolor: CSS.colors.blue,
            minHeight: "25%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack sx={{ width: "60%" }}>
            <TBody align="center" medium bungee>
              {title}
            </TBody>
          </Stack>
        </Stack>
      </Stack>
    </Link>
  );
};
