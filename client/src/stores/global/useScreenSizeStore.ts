import { create } from "zustand";

type IScreenSize = "xs" | "sm" | "md" | "lg" | "xl";

type IScreenSizeStore = {
  size: IScreenSize;
  setSize: (val: IScreenSize) => void;
};

export const useScreenSizeStore = create<IScreenSizeStore>()((set) => ({
  size: "lg",
  setSize: (size) => set({ size }),
}));
