import { type PropsWithChildren } from "react";
import { Provider } from "@/components/ui/provider";
import { BrowserRouter } from "react-router";
import { SnackbarProvider } from "notistack";

export const AllProviders = ({ children }: PropsWithChildren) => {
  return (
    <Provider>
      <SnackbarProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </SnackbarProvider>
    </Provider>
  );
};
