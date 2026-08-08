import { Outlet } from "react-router";
import { FullPage } from "./FullPage";
import clsx from "clsx";
import { useRefreshScreenStore } from "@/stores";
import { RefreshAuthOverlay } from "../overlay";
import { Header } from "../sections";

export const HeaderLayout = () => {
  const { open } = useRefreshScreenStore();

  return (
    <FullPage
      screen
      className={clsx(
        "flex flex-col",
        "max-w-screen overflow-clip",
        // open ? "max-h-screen overflow-y-hidden!" : "",
        open ? "max-h-screen" : "",
      )}
    >
      <Header />

      <div className="flex-1 relative">
        <Outlet />
      </div>

      <RefreshAuthOverlay />
    </FullPage>
  );
};
