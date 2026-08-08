import { Container, Flex, Stack } from "@chakra-ui/react";
import {
  ActionButton,
  BorderButton,
  TextFormInput,
  FormPage,
  SwitchFormInput,
} from "../../components";
import { useForm } from "react-hook-form";
import { ERROR_MESSAGE, TOKEN_KEYS } from "@/Constants";
import { useApi } from "@/hooks/api";
import { useAccessKeyStore, useUserStore } from "@/stores";
import { useEffect } from "react";
import { useCookieService, useNavigationService } from "@/hooks";

export const Login = () => {
  const { toDashboard } = useNavigationService();

  const {
    userRoutes: { login, abortSignal },
  } = useApi();

  const { loggedIn, user, setUser } = useUserStore();
  const setAccessKey = useAccessKeyStore((state) => state.setAccessKey);
  const { setCookie } = useCookieService();

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
    console.log(`User:`, JSON.stringify(user, null, 2));
    if (loggedIn) toDashboard();
  }, [loggedIn, toDashboard]);

  const submit = handleSubmit(async (data) => {
    abortSignal("login");

    const res = await login(data);

    if (res.err || !res.data) {
      console.log(`Internal error: `);
      console.log(res.err);
      return;
    }

    setUser(res.data.user);
    setAccessKey(res.data.token);
    setCookie(TOKEN_KEYS.ACCESS_KEY, res.data.token);

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
