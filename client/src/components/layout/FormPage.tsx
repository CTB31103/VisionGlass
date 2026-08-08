import { type PropsWithChildren, type ReactNode } from "react";
import { FullPage } from "./FullPage";
import { Card, Center, Container, Heading } from "@chakra-ui/react";

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
  return (
    <FullPage screen className="p-20! flex">
      <Center className="flex-1 ">
        <Container fluid maxW={"calc(100vw - 160px)"} minW={minW ?? "50vw"}>
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
