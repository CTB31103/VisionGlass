import type { IUser } from "@/interfaces";
import { useAuthFetch, useHttpSignal } from "../http";

export const useUserApi = () => {
  const { get, post, setCustomHeaders } = useAuthFetch();
  const { getNewSignal, abortSignal } = useHttpSignal();

  const login = async (body: {
    username: string;
    password: string;
    trustSource: boolean;
  }) => {
    return await post<{ user: IUser; token: string }>(
      "/api/users/login",
      body,
      {
        signal: getNewSignal("login"),
      },
    );
  };

  const refresh = async () => {
    return await get<{ user: IUser; token: string }>(
      "/api/users/refresh",
      getNewSignal("refresh"),
    );
  };

  const loginWithToken = async (accessToken: string) => {
    setCustomHeaders({ Authorization: `Bearer ${accessToken}` });
    return await get<{ user: IUser }>(
      "/api/users/login",
      getNewSignal("loginWithToken"),
    );
  };

  const logout = async () => {
    return await get<object>("/api/users/logout", getNewSignal("logout"));
  };

  return {
    login,
    loginWithToken,
    refresh,

    abortSignal,
    logout,
  };
};
