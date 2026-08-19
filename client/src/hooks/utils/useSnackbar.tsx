import { useSnackbar as useNSnackBar } from "notistack";

type UseSnackbarArrayResponse = [
  (msg: string) => void,
  (msg: string | null) => void,
];
type UseSnackbarObjectResponse = {
  successSnack: (msg: string) => void;
  errorSnack: (msg: string | null) => void;
};

type UseSnackbarResponse = UseSnackbarArrayResponse & UseSnackbarObjectResponse;

export const useSnackbar = () => {
  const { enqueueSnackbar } = useNSnackBar();
  const successSnack = (msg: string) =>
    enqueueSnackbar({
      message: msg,
      variant: "success",
    });
  const errorSnack = (msg: string | null = "Internal Service") =>
    enqueueSnackbar({
      message: msg,
      variant: "error",
    });

  const res: UseSnackbarResponse = Object.assign(
    [successSnack, errorSnack] as UseSnackbarArrayResponse,
    {
      successSnack,
      errorSnack,
    } as UseSnackbarObjectResponse,
  );

  return res;
};
