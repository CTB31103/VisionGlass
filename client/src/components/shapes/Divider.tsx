import { CSS } from "@/Constants";
import { Box } from "@chakra-ui/react";

type DividerProps = {
  color?: string;
};

export const Divider = ({ color = CSS.colors.darkGrey }: DividerProps) => {
  return <Box bg={color} className="w-full h-1.25" />;
};
