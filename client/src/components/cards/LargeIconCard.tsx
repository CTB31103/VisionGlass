import { CSS } from "@/Constants";
import { useScreenSize } from "@/hooks";
import { Card, Center, Heading, Stack, Text } from "@chakra-ui/react";
import clsx from "clsx";
import type { ReactNode } from "react";

type LargeIconCardProps = {
  title: string;
  desc: string;
  small?: boolean;
  hoverable?: boolean;
  icon: (styles: React.CSSProperties) => ReactNode;
};

export const LargeIconCard = ({
  icon,
  title,
  desc,
  small,
  hoverable,
}: LargeIconCardProps) => {
  const { lessThanEqualTo } = useScreenSize();
  const height = lessThanEqualTo.sm ? undefined : small ? 475 - 50 : 475;
  return (
    <Card.Root
      borderWidth={2}
      borderColor={CSS.colors.darkGrey}
      height={height}
      className={clsx(
        "w-full  transition-transform",
        hoverable ? "hover:-translate-y-1.25 hover:shadow-2xl" : "",
      )}
      size={"sm"}
    >
      <Card.Body className="h-full">
        <Center className="w-full h-full">
          <Stack className="h-full" justifyContent={"space-between"}>
            <Center className="w-full">
              {icon({
                fontSize: lessThanEqualTo.sm
                  ? `var(--chakra-font-sizes-6xl)`
                  : `calc(var(--chakra-font-sizes-6xl) * ${small ? "3.5" : "4"})`,
              })}
            </Center>
            <Stack gap={0}>
              <Heading
                textAlign={"center"}
                fontFamily={"Kameron"}
                fontWeight={"black"}
                size={lessThanEqualTo.sm ? "xl" : "3xl"}
              >
                {title}
              </Heading>
              <Text
                textAlign={"center"}
                fontSize={lessThanEqualTo.sm ? "sm" : "2xl"}
              >
                {desc}
              </Text>
            </Stack>
          </Stack>
        </Center>
      </Card.Body>
    </Card.Root>
  );
};
