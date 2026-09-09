import { create } from "zustand";

type ForceRefreshStore = {
  forceRefresh: boolean;
  setForceRefresh: (forceRefresh: boolean) => void;
};

export const useForceRefreshStore = create<ForceRefreshStore>()((set) => ({
  forceRefresh: false,
  setForceRefresh: (forceRefresh) => set({ forceRefresh }),
}));
