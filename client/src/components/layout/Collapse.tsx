import { Collapsible } from "@chakra-ui/react";
import { useState, type PropsWithChildren, type ReactNode } from "react";

type CollapseProps = {
  Header: ReactNode | ((props: { open: boolean }) => ReactNode);
};

export const Collapse = ({
  Header,
  children,
}: PropsWithChildren<CollapseProps>) => {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible.Root
      className="w-full"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Collapsible.Trigger className="w-full">
        {Header && typeof Header === "function" ? (
          <Header open={open} />
        ) : (
          Header
        )}
      </Collapsible.Trigger>
      <Collapsible.Content className="w-full">{children}</Collapsible.Content>
    </Collapsible.Root>
  );
};
