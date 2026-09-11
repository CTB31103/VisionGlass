import { Center } from "@chakra-ui/react";
import { ActionButton } from "./ActionButton";
import { useNavigationService } from "@/hooks";
import { Link } from "@mui/material";
import { ROUTES } from "@/Constants";

export const QuoteButton = ({
  text = "Get a FREE quote TODAY!",
  onClick,
}: {
  text?: string;
  onClick?: () => void;
}) => {
  const { toQuote } = useNavigationService();
  return (
    <Center className="w-full">
      <Link href={ROUTES.QUOTES} variant="inherit">
        <ActionButton onClick={onClick ?? toQuote} color="red">
          {text}
        </ActionButton>
      </Link>
    </Center>
  );
};
