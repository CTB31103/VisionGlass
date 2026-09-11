import type { IUser } from "@/interfaces";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type IUserStore = {
  loggedIn: boolean;
  user: IUser;
  setUser: (user: IUser) => void;
  logout: () => void;
};

const DEFAULT_USER: IUser = {
  userId: "",
  username: "",
  userType: "admin",
  profilePictureId: "",
  info: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  isRootUser: false,
};

export const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: DEFAULT_USER,
      loggedIn: false,
      setUser: (user) => set({ user, loggedIn: true }),
      logout: () => set({ user: DEFAULT_USER, loggedIn: false }),
    }),
    {
      name: "UserStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
