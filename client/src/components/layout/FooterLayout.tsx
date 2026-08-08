import { Outlet } from "react-router";
import { Footer } from "../sections";

export const FooterLayout = () => {
  return (
    <div className="flex-1">
      <Outlet />

      <Footer />
    </div>
  );
};
