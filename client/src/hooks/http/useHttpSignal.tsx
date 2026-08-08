import { useState } from "react";
import { produce } from "immer";

export const useHttpSignal = () => {
  const [currentSignals, setCurrentSignals] = useState<{
    [key: string]: AbortController;
  }>({});

  const getNewSignal = (from: string) => {
    const newController = new AbortController();

    setCurrentSignals((prev) =>
      produce(prev, (draft) => {
        draft[from] = newController;
      }),
    );

    return newController.signal;
  };

  const abortSignal = (to: string) => {
    const controller = currentSignals[to];
    if (controller) controller.abort();
  };

  return {
    getNewSignal,
    abortSignal,
  };
};
