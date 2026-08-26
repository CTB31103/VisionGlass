export type ISetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type IPaginationOptions = { pageNumber: number; pageLimit: number };

export type IPaginationResult = {
  page: number;
  pageLimit: number;
  total: number;
  totalPages: number;
};
