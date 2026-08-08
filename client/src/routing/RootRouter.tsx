import { Route, Routes } from "react-router";
import {
  About,
  Contact,
  Customers,
  Dashboard,
  Home,
  Login,
  PageNotFound,
  Quote,
  Reviews,
  Team,
} from "../pages";
import { FooterLayout, HeaderLayout } from "@/components";
import { ROUTES } from "@/Constants";

export const RootRouter = () => {
  return (
    <Routes>
      {/* Un-Auth */}
      <Route path={ROUTES.HOME} element={<HeaderLayout />}>
        <Route path={ROUTES.HOME} element={<FooterLayout />}>
          <Route index path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.QUOTES} element={<Quote />} />

          <Route path={ROUTES.LOGIN} element={<Login />} />

          {/* Auth */}
          <Route path={ROUTES.CUSTOMERS} element={<Customers />} />
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.TEAM} element={<Team />} />
          <Route path={ROUTES.REVIEWS} element={<Reviews />} />

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Route>
    </Routes>
  );
};
