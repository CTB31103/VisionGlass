import type { IPerson, IUser } from "@/interfaces";
import queryString from "query-string";
import { useAuthFetch, useHttpSignal } from "../http";
import type { IPaginationOptions, IPaginationResult } from "../types";
import { DEFAULT_PAGINATION_OPTION } from "@/Constants";

export const useUserApi = () => {
  const { get, post, put, setCustomHeaders } = useAuthFetch();
  const { getNewSignal, abortSignal } = useHttpSignal();

  const validAccessKey = async () => {
    const res = await get<{ granted: boolean }>("/api/users/access");
    if (res.err || !res.data) return false;
    return true;
  };

  const createUser = async (
    data: IPerson & { username: string; password: string; userType: string },
  ) => {
    return await post<{ user: IUser }>(`/api/users/`, data, {
      signal: getNewSignal("createUser"),
    });
  };

  const getAllUsers = async (
    options: IPaginationOptions & {
      query?: string;
      role?: string;
      sortBy?: string;
    } = DEFAULT_PAGINATION_OPTION,
  ) => {
    return await get<{ users: IUser[] } & IPaginationResult>(
      `/api/users?${queryString.stringify(options)}`,
      getNewSignal(`getAllUsers`),
    );
  };

  const getUsers = async (userIds: string[]) => {
    return await get<{ users: IUser[] }>(
      `/api/users?${queryString.stringify({ userIds })}`,
    );
  };

  const getUser = async (userId: string) => {
    return await get<{ user: IUser }>(`/api/users/${userId}`);
  };

  const verifyUser = async (data: {
    currentPassword: string;
    userId: string;
  }) => {
    return await post<{ verified: boolean }>(
      `/api/users/${data.userId}/verification`,
      data,
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

  const editUser = async (
    userId: string,
    data: IPerson & { username: string; password: string; userType: string },
  ) => {
    return await put<{ user: IUser }>(`/api/users/${userId}`, data, {
      signal: getNewSignal(`editUser`),
    });
  };

  const changePassword = async (data: {
    userId: string;
    password: string;
    currentPassword: string;
  }) => {
    return await put<{ success: boolean }>(
      `/api/users/${data.userId}/authentication`,
      data,
    );
  };

  return {
    getAllUsers,
    getUsers,

    verifyUser,
    createUser,
    editUser,
    getUser,
    validAccessKey,

    login,
    loginWithToken,
    refresh,

    changePassword,

    abortSignal,
    logout,
  };
};
