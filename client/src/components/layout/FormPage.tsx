import { type PropsWithChildren, type ReactNode } from "react";
import { FullPage } from "./FullPage";
import { Card, Center, Container, Heading } from "@chakra-ui/react";
import { useScreenSize } from "@/hooks";
import clsx from "clsx";

export const FormPage = ({
  children,
  title,
  minW,
  footer,
}: PropsWithChildren<{
  title?: { value: string; center?: boolean };
  minW?: number | string;
  footer?: ReactNode;
}>) => {
  const { lessThanEqualTo } = useScreenSize();
  return (
    <FullPage
      screen
      className={clsx("flex", lessThanEqualTo.xs ? "" : "p-20!")}
    >
      <Center className="flex-1 ">
        <Container
          fluid
          maxW={"calc(100vw - 160px)"}
          minW={minW ?? (lessThanEqualTo.xs ? "100%" : "50vw")}
        >
          <Card.Root size={"sm"}>
            {title && (
              <Card.Header>
                <Heading size={"2xl"} className="bungee">
                  {title.center ? <Center>{title.value}</Center> : title.value}
                </Heading>
              </Card.Header>
            )}

            <Card.Body>{children}</Card.Body>

            {footer && <Card.Footer>{footer}</Card.Footer>}
          </Card.Root>
        </Container>
      </Center>
    </FullPage>
  );
};
