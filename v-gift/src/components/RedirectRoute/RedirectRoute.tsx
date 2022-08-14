import { Navigate, Outlet } from "react-router-dom";
import { Routes } from "@/constants/routes";

export interface PrivateRouteProps {
  redirectRoute?: Routes;
  shouldRedirect: boolean;
}

export const RedirectRoute = ({
  redirectRoute = Routes.LOGIN,
  shouldRedirect,
}: PrivateRouteProps) => {
  return shouldRedirect ? <Navigate to={redirectRoute} /> : <Outlet />;
};
