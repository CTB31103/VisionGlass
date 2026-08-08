import { create } from "zustand";

type IAccessKeyStore = {
  accessKey: string | null;
  setAccessKey: (v: string | null) => void;
};

export const useAccessKeyStore = create<IAccessKeyStore>()((set) => ({
  accessKey: null,
  setAccessKey: (v: string | null) => set({ accessKey: v }),
}));
