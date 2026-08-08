import { FormPage } from "@/components";
import { CSS, ROUTES } from "@/Constants";
import { Center, Heading, Link, Text } from "@chakra-ui/react";

export const PageNotFound = () => {
  return (
    <FormPage>
      <Center className="w-full flex flex-col">
        <Text textStyle={"md"}>Sorry this page does not exist</Text>
        <Heading fontWeight={"black"} textStyle={"5xl"}>
          Page Not Found
        </Heading>
        <Text textStyle={"md"}>
          Back to{" "}
          <Link
            fontWeight={"bold"}
            color={CSS.colors.blue}
            focusRingColor={CSS.colors.blue}
            textDecorationColor={CSS.colors.blue}
            href={ROUTES.HOME}
            variant={"underline"}
          >
            Home
          </Link>
        </Text>
      </Center>
    </FormPage>
  );
};
