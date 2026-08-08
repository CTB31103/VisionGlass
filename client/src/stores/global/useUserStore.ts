import type { IUser } from "@/interfaces";
import { create } from "zustand";

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
};

export const useUserStore = create<IUserStore>()((set) => ({
  user: DEFAULT_USER,
  loggedIn: false,
  setUser: (user) => set({ user, loggedIn: true }),
  logout: () => set({ user: DEFAULT_USER, loggedIn: false }),
}));
