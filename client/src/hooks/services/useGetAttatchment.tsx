import type { IAttatchment } from "@/interfaces";
import { useState } from "react";

import { useTimeoutEffect } from "../utils";
import { useApi } from "../api";

export const useGetAttatchment = ({
  attatchmentId,
  deps = [attatchmentId],
  initialState,
}: {
  attatchmentId?: string;
  deps?: (string | number | undefined)[];
  initialState?: {
    loading?: boolean;
    attatchment?: IAttatchment;
  };
} = {}) => {
  const {
    snackbar: [_, errorSnack],
    attatchmentRoutes,
  } = useApi();

  const [loading, setLoading] = useState(initialState?.loading ?? false);
  const [attatchment, setAttatchment] = useState<IAttatchment | undefined>(
    initialState?.attatchment ?? undefined,
  );

  const getAttatchment = async (
    attatchmentId: string,
    cb: (attatchment: IAttatchment) => void,
  ) => {
    setLoading(true);

    const res = await attatchmentRoutes.getAttatchments({
      attatchmentIds: [attatchmentId],
    });
    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    if (res.data.attatchments.length > 0) cb(res.data.attatchments[0]);
  };

  useTimeoutEffect(
    () => {
      if (!attatchmentId || attatchmentId.length === 0) return;
      getAttatchment(attatchmentId, (attatchment) =>
        setAttatchment(attatchment),
      );
    },
    deps,
    50,
  );

  return {
    loading,

    attatchment,
    setAttatchment,

    getAttatchment,
  };
};
