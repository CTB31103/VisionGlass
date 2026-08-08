import { ActionButton, FullPage } from "@/components";
import { useLogoutService } from "@/hooks";
import { useRefreshScreenStore } from "@/stores";
import { Center, Container, HStack } from "@chakra-ui/react";

export const Dashboard = () => {
  const { open, setOpen } = useRefreshScreenStore();
  const logout = useLogoutService();

  return (
    <FullPage screen={true} className="flex">
      <Container fluid className="flex">
        <Center className="flex w-full">
          <Container fluid className="flex">
            <Center className="w-full">
              <HStack gap={5}>
                <ActionButton onClick={logout}>Logout</ActionButton>
                <ActionButton onClick={() => setOpen(!open)}>
                  Open Refresh
                </ActionButton>
              </HStack>
            </Center>
          </Container>
        </Center>
      </Container>
    </FullPage>
  );
};
