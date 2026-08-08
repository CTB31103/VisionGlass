import { ROUTES } from "@/Constants";
import { useNavigate } from "react-router";

export const useNavigationService = () => {
  const navigate = useNavigate();

  const toLogin = () => navigate(ROUTES.LOGIN);

  const toDashboard = () => navigate(ROUTES.DASHBOARD);

  const toHome = () => navigate(ROUTES.HOME);

  const toAbout = () => navigate(ROUTES.ABOUT);

  const toContact = () => navigate(ROUTES.CONTACT);

  const toCustomers = () => navigate(ROUTES.CUSTOMERS);

  const toQuote = (data?: {
    firstName: string;
    lastName: string;
    phone: string;
    service: string;
  }) => navigate(ROUTES.QUOTES, { state: { shortForm: data } });

  const toTeam = () => navigate(ROUTES.TEAM);

  return {
    toLogin,
    toDashboard,
    toHome,
    toAbout,
    toContact,
    toCustomers,
    toQuote,
    toTeam,
  };
};
