import { useState } from "react";
import type { ISetState } from "../types";

type IStateResult<T> = [T, ISetState<T>];

export const usePaginatedState = <T,>(
  {
    initialData,
  }: {
    initialData: T[];
  } = { initialData: [] },
) => {
  const [value, setValue] = useState<T[]>(initialData);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalQuotes, setTotalQuotes] = useState(0);
  return {
    docs: [value, setValue] as IStateResult<T[]>,
    totalDocs: [totalQuotes, setTotalQuotes] as IStateResult<number>,

    pageNumber,
    setPageNumber,
    pageLimit,
    setPageLimit,
    totalPages,
    setTotalPages,
  };
};
