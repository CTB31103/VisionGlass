import { useEffect } from "react";

export const useBeforeUnload = (cb: () => void) => {
  useEffect(() => {
    window.addEventListener("beforeunload", cb);

    return () => {
      window.removeEventListener("beforeunload", cb);
    };
  }, []);
};
