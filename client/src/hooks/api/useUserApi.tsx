import type { IPerson, IUser } from "@/interfaces";
import queryString from "query-string";
import { useAuthFetch, useHttpSignal } from "../http";

export const useUserApi = () => {
  const { get, post, setCustomHeaders } = useAuthFetch();
  const { getNewSignal, abortSignal } = useHttpSignal();

  const validAccessKey = async () => {
    const res = await get<{ granted: boolean }>("/api/users/access");
    if (res.err || !res.data) return false;
    return true;
  };

  const createUser = async (
    data: IPerson & { username: string; password: string; userType: string },
  ) => {
    return await post<{ newUser: IUser }>(`/api/users/`, data, {
      signal: getNewSignal("createUser"),
    });
  };

  const getAllUsers = async () => {
    return await get<{ users: IUser[] }>(
      `/api/users/`,
      getNewSignal(`getAllUsers`),
    );
  };

  const searchUsers = async (data: { query: string }) => {
    return await get<{ users: IUser[] }>(
      `/api/users/search?${queryString.stringify(data)}`,
    );
  };

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
    getAllUsers,
    searchUsers,
    createUser,
    validAccessKey,

    login,
    loginWithToken,
    refresh,

    abortSignal,
    logout,
  };
};
