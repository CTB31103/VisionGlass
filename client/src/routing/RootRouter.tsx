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
  ServicesPage,
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
          <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
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

// 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

// git remote set-url origin https://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@://github.com
//
// https://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@github.com/CTB31103/VisionAutoGlass.git
