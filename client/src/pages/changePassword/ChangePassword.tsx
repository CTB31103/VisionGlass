import {
  ActionButton,
  FullPage,
  Icons,
  PageHeader,
  THeading,
  ToggleSecureTextInput,
} from "@/components";
import { ROUTES } from "@/Constants";
import {
  useApi,
  useBeforeUnload,
  useScreenSize,
  useTimeoutEffect,
} from "@/hooks";
import { leadingZero, toString } from "@/utils";
import { RULES, validation } from "@/validation";
import { Stack } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTimer } from "react-timer-hook";

const FIVE_MIN_SECONDS = 5 * 60;

export const ChangePassword = () => {
  const navigate = useNavigate();
  const params = useParams();

  const {
    snackbar: [_, errorSnack],
    userRoutes,
  } = useApi();

  const { lessThanEqualTo } = useScreenSize();

  const [loading, setLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [pwdMatch, setPwdMatch] = useState(false);
  const [newPassword, setNewPassowrd] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const {
    minutes,
    seconds,

    restart,
  } = useTimer({
    autoStart: false,
    expiryTimestamp: new Date(),
    onExpire: () => resetState(),
  });

  const restartTimer = (auto: boolean = false) => {
    restart(
      moment(new Date())
        .seconds(new Date().getSeconds() + FIVE_MIN_SECONDS)
        .toDate(),
      auto,
    );
  };

  const resetState = () => {
    restartTimer(false);
    setPwdMatch(false);
    setCurrentPassword("");
    setNewPassowrd("");
    setRepeatPassword("");
  };

  const verifyPassword = async () => {
    setLoading(true);

    const res = await userRoutes.verifyUser({
      currentPassword,
      userId: params!.userId as string,
    });
    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    if (!res.data.verified)
      return errorSnack(`Incorrect password. Please try again.`);

    setPwdMatch(res.data.verified);
    restartTimer(true);
  };

  const isValid = () => {
    const { errorMsg } = validation<{
      password: string;
      repeatPassword: string;
    }>(
      {
        password: [
          RULES.multiple(RULES.min(6), RULES.common.requiredString),
          "new password",
        ],
        repeatPassword: [
          RULES.multiple(RULES.min(6), RULES.common.requiredString),
          "repeat password",
        ],
      },
      { password: newPassword, repeatPassword },
    );

    if (errorMsg) {
      errorSnack(errorMsg);
      return false;
    }

    if (newPassword !== repeatPassword) {
      errorSnack(`New password and repeat password do not match`);
      return false;
    }

    return true;
  };

  const changePassword = async () => {
    if (!isValid()) return;

    setLoading(true);

    const res = await userRoutes.changePassword({
      currentPassword,
      password: newPassword,
      userId: params!.userId as string,
    });
    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    resetState();
    navigate(ROUTES.PROFILE);
  };

  useTimeoutEffect(
    () => {
      resetState();

      if (!params.userId) {
        navigate(ROUTES.PROFILE);
      }
    },
    [toString(params)],
    150,
  );

  useBeforeUnload(() => {
    resetState();
  });

  return (
    <FullPage>
      <Stack
        sx={{
          width: "100%",
          paddingBlock: lessThanEqualTo.md ? 6 : 4,
          paddingInline: lessThanEqualTo.xs ? 2 : 8,
          pb: lessThanEqualTo.md ? 2 : undefined,
        }}
        spacing={lessThanEqualTo.xs ? 4 : 4}
      >
        <Stack sx={{ width: "100%" }} spacing={2}>
          <PageHeader onGoBack={() => navigate(-1)} text="Change Password" />

          {pwdMatch && (
            <Stack sx={{ width: "100%", alignItems: "center" }}>
              <THeading>
                {leadingZero(minutes)}:{leadingZero(seconds)}
              </THeading>
            </Stack>
          )}
        </Stack>

        <Stack
          sx={{
            width: "100%",
            height: "40vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!pwdMatch ? (
            <Stack
              sx={{
                width: lessThanEqualTo.xs
                  ? "100%"
                  : lessThanEqualTo.sm
                    ? "75%"
                    : "50%",
                alignItems: lessThanEqualTo.xs ? undefined : "end",
              }}
              spacing={2}
            >
              <ToggleSecureTextInput
                label="Enter Current Password:"
                endIcon={<Icons.Password />}
                value={currentPassword}
                disabled={loading}
                setValue={setCurrentPassword}
                keyMappings={{
                  Enter: verifyPassword,
                }}
                secure
              />

              <ActionButton color="red" onClick={verifyPassword}>
                Verify
              </ActionButton>
            </Stack>
          ) : (
            <Stack
              sx={{
                width: lessThanEqualTo.xs ? "100%" : "50%",
                alignItems: lessThanEqualTo.xs ? undefined : "end",
              }}
              spacing={2}
            >
              <ToggleSecureTextInput
                label="Enter New Password:"
                endIcon={<Icons.Password />}
                value={newPassword}
                setValue={setNewPassowrd}
                secure
              />
              <ToggleSecureTextInput
                label="Repeat New Password:"
                endIcon={<Icons.Password />}
                value={repeatPassword}
                setValue={setRepeatPassword}
                secure
              />

              <ActionButton color="red" onClick={changePassword}>
                Save
              </ActionButton>
            </Stack>
          )}
        </Stack>
      </Stack>
    </FullPage>
  );
};
