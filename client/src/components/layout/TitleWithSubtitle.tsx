import { Stack } from "@mui/material";
import { TBody, THeading } from "../typography";

type TitleWithSubtitleProps = {
  title: string;
  subtitle: string;
};

export const TitleWithSubtitle = ({
  title,
  subtitle,
}: TitleWithSubtitleProps) => {
  return (
    <Stack>
      <THeading>{title}</THeading>
      <TBody>{subtitle}</TBody>
    </Stack>
  );
};
