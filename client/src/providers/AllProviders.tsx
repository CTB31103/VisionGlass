import { type PropsWithChildren } from "react";
import { Provider } from "@/components/ui/provider";
import { BrowserRouter } from "react-router";
import { SnackbarProvider } from "notistack";
import { ColorModeProvider } from "@/components/ui/color-mode";

export const AllProviders = ({ children }: PropsWithChildren) => {
  return (
    <Provider>
      <ColorModeProvider>
        <SnackbarProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </SnackbarProvider>
      </ColorModeProvider>
    </Provider>
  );
};
