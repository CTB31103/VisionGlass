import { create } from "zustand";

type IRefreshScreenStore = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

export const useRefreshScreenStore = create<IRefreshScreenStore>()((set) => ({
  open: false,
  setOpen: (v) => set({ open: v }),
}));
