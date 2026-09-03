import { Container, Flex, Stack } from "@chakra-ui/react";
import {
  ActionButton,
  BorderButton,
  TextFormInput,
  FormPage,
  SwitchFormInput,
} from "../../components";
import { useForm } from "react-hook-form";
import { ERROR_MESSAGE } from "@/Constants";
import { useApi } from "@/hooks/api";
import { useAccessKeyStore, useUserStore } from "@/stores";
import { useEffect } from "react";
import { useNavigationService } from "@/hooks";

export const Login = () => {
  const { toDashboard } = useNavigationService();

  const {
    snackbar: [_, errorSnack],
    userRoutes: { login, abortSignal },
  } = useApi();

  const { loggedIn, setUser } = useUserStore();
  const setAccessKey = useAccessKeyStore((state) => state.setAccessKey);

  const { control, handleSubmit } = useForm<{
    username: string;
    password: string;
    trustSource: boolean;
  }>({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
      trustSource: false,
    },
  });

  useEffect(() => {
    if (loggedIn) toDashboard();
  }, [loggedIn, toDashboard]);

  const submit = handleSubmit(async (data) => {
    abortSignal("login");

    const res = await login(data);

    if (res.err || !res.data) return errorSnack(res.err);

    setUser(res.data.user);
    setAccessKey(res.data.token);

    toDashboard();
  });

  return (
    <FormPage
      title={{ value: "Login", center: true }}
      footer={
        <Container fluid p={0}>
          <Flex
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <BorderButton>Sign Up</BorderButton>

            <ActionButton color="blue" onClick={submit}>
              Login
            </ActionButton>
          </Flex>
        </Container>
      }
    >
      <Stack>
        <TextFormInput
          label="Username"
          control={control}
          name="username"
          rules={{ required: ERROR_MESSAGE.required.static }}
          required
        />
        <TextFormInput
          label="Password"
          control={control}
          name="password"
          rules={{ required: ERROR_MESSAGE.required.static }}
          required
          secure
        />

        <SwitchFormInput
          label="Trust this computer"
          control={control}
          name="trustSource"
        />
      </Stack>
    </FormPage>
  );
};
