import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type IAccessKeyStore = {
  accessKey: string | null;
  setAccessKey: (v: string | null) => void;
};

export const useAccessKeyStore = create<IAccessKeyStore>()(
  persist(
    (set) => ({
      accessKey: null,
      setAccessKey: (v: string | null) => set({ accessKey: v }),
    }),
    {
      name: "AccessKeyStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
