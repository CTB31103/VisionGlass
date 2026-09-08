import type { IUser } from "@/interfaces";
import { useState } from "react";
import { useApi } from "../api";
import { useRefreshEffect } from "../utils";

export const useGetUserService = ({
  userId,
  deps = [userId],
  initialState,
}: {
  userId?: string;
  deps?: (string | number | undefined)[];
  initialState?: {
    loading?: boolean;
    user?: IUser;
  };
} = {}) => {
  const {
    snackbar: [_, errorSnack],
    userRoutes,
  } = useApi();

  const [loading, setLoading] = useState(initialState?.loading ?? false);
  const [user, setUser] = useState<IUser | undefined>(
    initialState?.user ?? undefined,
  );

  const getUser = async (userId: string, cb: (user: IUser) => void) => {
    setLoading(true);

    const res = await userRoutes.getUser(userId);
    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    cb(res.data.user);
  };

  useRefreshEffect(
    () => {
      if (!userId || userId.length === 0) return;
      getUser(userId, (user) => setUser(user));
    },
    deps,
    50,
  );

  return {
    loading,

    user,
    setUser,

    getUser,
  };
};
