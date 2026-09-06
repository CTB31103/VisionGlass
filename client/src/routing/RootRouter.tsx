import { Route, Routes } from "react-router";
import {
  About,
  ChangePassword,
  Contact,
  Customer,
  CustomerAdd,
  CustomerAttatchment,
  Customers,
  Dashboard,
  DashboardAdd,
  Fairs,
  Home,
  Login,
  PageNotFound,
  Profile,
  Quote,
  Reviews,
  ServicesADAS,
  ServicesAutoGlass,
  ServicesCrackChip,
  ServicesMobile,
  ServicesPage,
  ServicesWindshieldReplacements,
  Team,
  TeamAdd,
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
          <Route path={ROUTES.FAIRS} element={<Fairs />} />

          <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
          <Route
            path={ROUTES.SERVICE_WR}
            element={<ServicesWindshieldReplacements />}
          />
          <Route path={ROUTES.SERVICE_ADAS} element={<ServicesADAS />} />
          <Route path={ROUTES.SERVICE_AG} element={<ServicesAutoGlass />} />
          <Route path={ROUTES.SERVICE_CC} element={<ServicesCrackChip />} />
          <Route path={ROUTES.SERVICE_MB} element={<ServicesMobile />} />

          <Route path={ROUTES.LOGIN} element={<Login />} />

          {/* Auth */}
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.PROFILE + "/:userId"} element={<Profile />} />
          <Route
            path={ROUTES.PROFILE_PWD(":userId")}
            element={<ChangePassword />}
          />

          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.DASHBOARD_ADD} element={<DashboardAdd />} />

          <Route path={ROUTES.CUSTOMERS_ADD} element={<CustomerAdd />} />
          <Route
            path={ROUTES.CUSTOMERS_EDIT + "/:customerQuoteId"}
            element={<CustomerAdd />}
          />
          <Route
            path={ROUTES.CUSTOMERS_ATTATCHMENT(
              ":customerQuoteId",
              ":attatchmentId",
            )}
            element={<CustomerAttatchment />}
          />
          <Route path={ROUTES.CUSTOMERS} element={<Customers />} />
          <Route
            path={ROUTES.CUSTOMERS + "/:customerQuoteId"}
            element={<Customer />}
          />

          <Route path={ROUTES.TEAM} element={<Team />} />
          <Route path={ROUTES.TEAM_ADD} element={<TeamAdd />} />
          <Route path={ROUTES.TEAM_EDIT + "/:userId"} element={<TeamAdd />} />

          <Route path={ROUTES.REVIEWS} element={<Reviews />} />

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Route>
    </Routes>
  );
};
