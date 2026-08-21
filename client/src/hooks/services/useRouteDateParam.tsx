import queryString from "query-string";
import { useEffect } from "react";
import { useLocation } from "react-router";

export const useRouteDateParam = (
  cb: (paramDate: Date) => void,
  deps: unknown[] = [],
) => {
  const location = useLocation();
  useEffect(() => {
    if (location.search) {
      const params = queryString.parse(location.search);

      if (params?.date && !Number.isNaN(parseInt(params.date as string))) {
        cb(new Date(parseInt(params.date as string)));
      }
    }
  }, [location, ...deps]);
};
