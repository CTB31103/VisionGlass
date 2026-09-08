import {
  ActionButton,
  BasicModal,
  FullPage,
  LabledRowText,
  LoadingPage,
  ModalCloseCenterButton,
  PageHeader,
  SelectInput,
  TextInput,
} from "@/components";
import { ROUTES } from "@/Constants";

import { useApi, useRefreshEffect, useTimeoutEffect } from "@/hooks";
import { USER_TYPES, UserType, type IUser } from "@/interfaces";
import { useUserStore } from "@/stores";
import { capitalize, toString } from "@/utils";
import { RULES, validation } from "@/validation";
import { Stack } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

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
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    snackbar: [_, errorSnack],
    userRoutes: { createUser, getUser, editUser },
  } = useApi();
  const { user } = useUserStore();

  const [loading, setLoading] = useState(false);
  const [getUserLoading, setGetUserLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [tempPwd, setTmpPwd] = useState("");
  const [role, setRole] = useState<string>(UserType.SALES);

  const [apiResponseUser, setApiResponseUser] = useState<IUser | undefined>(
    undefined,
  );

  const [editingUser, setEditingUser] = useState<IUser | undefined>(undefined);
  const isEditing = location.pathname.includes(ROUTES.TEAM_EDIT);
  const isUserEditing = user.userType !== UserType.ADMIN && isEditing;

  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const availableRoles = USER_TYPES.slice(
    // When creating, only root can make admin, admin can make non admin
    // When editing,
    user.isRootUser ? 0 : 1,
    USER_TYPES.length,
  ).map((t) => ({
    value: t,
    text: capitalize(t),
  }));

  const getEditingUser = async (userId: string) => {
    setGetUserLoading(true);

    const res = await getUser(userId);
    setGetUserLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    setEditingUser(res.data.user);
  };

  useTimeoutEffect(
    () => {
      setUsername(`${firstName.toLowerCase()}${lastName.toLowerCase()}`);
    },
    [firstName, lastName],
    250,
  );

  useTimeoutEffect(() => {
    if (params.userId) {
      getEditingUser(params.userId);
    }
  }, [toString(params)]);

  useRefreshEffect(() => {
    if (editingUser?.isRootUser) {
      navigate(-1);
      return;
    }

    if (editingUser) {
      setFirstName(editingUser.info.firstName);
      setLastName(editingUser.info.lastName);
      setPhone(editingUser.info.phone);
      setEmail(editingUser.info.email);
      setUsername(editingUser.username);
      setRole(editingUser.userType);
    }
  }, [editingUser?.userId]);

  const isValid = (data: IData) => {
    const props = validation<IData>(
      {
        firstName: [RULES.common.requiredString, "first name"],
        lastName: [RULES.common.requiredString, "last name"],
        email: [RULES.common.requiredEmail, ""],
        phone: [RULES.common.requiredString, ""],
        username: [RULES.common.requiredString, ""],
        password: [
          isEditing ? RULES.common.presentString : RULES.common.requiredString,
          "temporary password",
        ],
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

    const res = await (isEditing && editingUser
      ? editUser(editingUser.userId, data)
      : createUser(data));

    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    setSuccessModalOpen(true);
    setApiResponseUser(res.data.user);
  };

  if (getUserLoading) return <LoadingPage />;

  const RoleSelect = () => (
    <SelectInput
      required
      disabled={isUserEditing}
      label="User Role:"
      items={availableRoles}
      selectedItem={role}
      onSelect={setRole}
    />
  );

  return (
    <FullPage>
      <Stack sx={{ width: "100%", pt: 4, pb: 8, paddingInline: 8 }} spacing={4}>
        <PageHeader
          onGoBack={() => navigate(-1)}
          text={
            isEditing
              ? `Edit ${isUserEditing ? "Profile" : "Team Member"}`
              : "Create Team Member"
          }
        />

        <Stack sx={{ width: "100%" }} spacing={2}>
          <Stack sx={{ width: "100%" }} direction={"row"} spacing={2}>
            <TextInput
              required
              disabled={isUserEditing}
              label="First Name:"
              value={firstName}
              setValue={setFirstName}
            />

            <TextInput
              required
              disabled={isUserEditing}
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

            {!isEditing ? (
              <TextInput
                required
                secure
                label="Temporary Password:"
                value={tempPwd}
                setValue={setTmpPwd}
              />
            ) : /*
            must be root user or an admin editing another user
            users cannot edit their own role
            */
            user.userId !== editingUser?.userId &&
              (user.isRootUser ||
                (user.userType === UserType.ADMIN &&
                  editingUser?.userType !== UserType.ADMIN)) ? (
              <RoleSelect />
            ) : (
              <Stack sx={{ width: "100%" }} />
            )}
          </Stack>

          {!isEditing && (
            <Stack sx={{ width: "100%" }} direction={"row"} spacing={2}>
              <RoleSelect />

              <Stack sx={{ width: "100%" }} />
            </Stack>
          )}
        </Stack>

        <Stack
          direction={"row"}
          sx={{ width: "100%", justifyContent: "center" }}
        >
          <ActionButton loading={loading} onClick={submit} color="red">
            {isEditing ? `Save` : "Create New User"}
          </ActionButton>
        </Stack>

        <BasicModal
          title="Success"
          subtitle={
            isEditing
              ? `${isUserEditing ? "Profile" : "Team member"} information updated`
              : "New team member added to the system."
          }
          shrinkHeight
          open={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
        >
          <Stack
            sx={{
              width: "100%",
              height: "100%",
              alignItems: "center",
            }}
          >
            <Stack
              sx={{
                // width: "75%",
                height: "100%",
                alignItems: "start",
              }}
            >
              <LabledRowText
                bold="Username:"
                text={apiResponseUser?.username ?? username}
              />
              <LabledRowText
                bold="First name:"
                text={apiResponseUser?.info.firstName ?? firstName}
              />
              <LabledRowText
                bold="Last name:"
                text={apiResponseUser?.info.lastName ?? lastName}
              />
              <LabledRowText
                bold="Email:"
                text={apiResponseUser?.info.email ?? email}
              />
              <LabledRowText
                bold="Phone:"
                text={apiResponseUser?.info.phone ?? phone}
              />
              <LabledRowText
                bold="Role:"
                text={capitalize(apiResponseUser?.userType ?? role)}
              />
              {!isEditing && <LabledRowText bold="Password:" text={tempPwd} />}
            </Stack>
          </Stack>

          <ModalCloseCenterButton
            onClick={() => (setSuccessModalOpen(false), navigate(ROUTES.TEAM))}
          />
        </BasicModal>
      </Stack>
    </FullPage>
  );
};
