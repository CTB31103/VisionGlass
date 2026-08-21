import {
  ActionButton,
  BasicModal,
  ModalCloseCenterButton,
  PageHeader,
  SelectInput,
  TBody,
  TextInput,
} from "@/components";

import { useApi, useTimeoutEffect } from "@/hooks";
import { USER_TYPES, UserType } from "@/interfaces";
import { capitalize } from "@/utils";
import { RULES, validation } from "@/validation";
import { Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

type IData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  userType: string;
};

export const TeamAdd = () => {
  const navigate = useNavigate();
  const {
    snackbar: [_, errorSnack],
    userRoutes: { createUser },
  } = useApi();

  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [tempPwd, setTmpPwd] = useState("");
  const [role, setRole] = useState<string>(UserType.SALES);

  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const availableRoles = USER_TYPES.map((t) => ({
    value: t,
    text: capitalize(t),
  }));

  useTimeoutEffect(
    () => {
      setUsername(`${firstName.toLowerCase()}${lastName.toLowerCase()}`);
    },
    [firstName, lastName],
    250,
  );

  const isValid = (data: IData) => {
    const props = validation<IData>(
      {
        firstName: [RULES.common.requiredString, "first name"],
        lastName: [RULES.common.requiredString, "last name"],
        email: [RULES.common.requiredEmail, ""],
        phone: [RULES.common.requiredString, ""],
        username: [RULES.common.requiredString, ""],
        password: [RULES.common.requiredString, "temporary password"],
        userType: [RULES.common.requiredString, "user role"],
      },
      data,
    );
    if (props.errorMsg) {
      errorSnack(props.errorMsg);
      return false;
    }
    return true;
  };

  const submit = async () => {
    setLoading(true);

    const data = {
      firstName,
      lastName,
      email,
      phone,

      username,
      password: tempPwd,
      userType: role,
    };

    if (!isValid(data)) {
      setLoading(false);
      return;
    }

    const res = await createUser(data);

    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    setSuccessModalOpen(true);
  };

  return (
    <Stack sx={{ width: "100%", pt: 4, pb: 8, paddingInline: 8 }} spacing={4}>
      <PageHeader onGoBack={() => navigate(-1)} text="Create Team Member" />

      <Stack sx={{ width: "100%" }} spacing={2}>
        <Stack sx={{ width: "100%" }} direction={"row"} spacing={2}>
          <TextInput
            required
            label="First Name:"
            value={firstName}
            setValue={setFirstName}
          />

          <TextInput
            required
            label="Last Name:"
            value={lastName}
            setValue={setLastName}
          />
        </Stack>

        <Stack sx={{ width: "100%" }} direction={"row"} spacing={2}>
          <TextInput
            required
            label="Phone:"
            placeholder="xxx xxx-xxxx"
            value={phone}
            setValue={setPhone}
          />

          <TextInput
            required
            label="Email:"
            value={email}
            setValue={setEmail}
          />
        </Stack>

        <Stack sx={{ width: "100%" }} direction={"row"} spacing={2}>
          <TextInput
            required
            label="Username:"
            disabled
            value={username}
            setValue={setUsername}
          />

          <TextInput
            required
            secure
            label="Temporary Password:"
            value={tempPwd}
            setValue={setTmpPwd}
          />
        </Stack>

        <Stack sx={{ width: "100%" }} direction={"row"} spacing={2}>
          <SelectInput
            required
            label="User Role:"
            items={availableRoles}
            selectedItem={role}
            onSelect={setRole}
          />

          <Stack sx={{ width: "100%" }} />
        </Stack>
      </Stack>

      <Stack direction={"row"} sx={{ width: "100%", justifyContent: "center" }}>
        <ActionButton loading={loading} onClick={submit} color="red">
          Create New User
        </ActionButton>
      </Stack>

      <BasicModal
        title="Success"
        subtitle="New team member added to the system."
        open={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
      >
        <Stack
          sx={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TBody medium>Username: {username}</TBody>
          <TBody medium>Password: {tempPwd}</TBody>
        </Stack>

        <ModalCloseCenterButton
          onClick={() => (setSuccessModalOpen(false), navigate(-1))}
        />
      </BasicModal>

      {/* <Modal >
        <Stack
          sx={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            sx={{
              width: "60vw",
              height: "70vh",
              borderRadius: 5,
              borderWidth: 1,
              borderColor: CSS.colors.black,
            }}
            elevation={4}
          >
            <Stack sx={{ width: "100%", height: "100%", p: 4 }} spacing={2}>
              <Stack sx={{ width: "100%", alignItems: "center" }}>
                <THeading bungeeFill>Success</THeading>
                <TBody>New team member added to the system.</TBody>
              </Stack>

              <Stack
                sx={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TBody medium>Username: {username}</TBody>
                <TBody medium>Password: {tempPwd}</TBody>
              </Stack>

              <Stack
                sx={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActionButton
                  onClick={() => (setSuccessModalOpen(false), navigate(-1))}
                  color="red"
                >
                  Close
                </ActionButton>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Modal> */}
    </Stack>
  );
};
