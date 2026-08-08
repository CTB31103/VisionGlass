import { type PropsWithChildren } from "react";
import { Provider } from "@/components/ui/provider";
import { BrowserRouter } from "react-router";

export const AllProviders = ({ children }: PropsWithChildren) => {
  return (
    <Provider>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};
