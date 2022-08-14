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
  console.log(shouldRedirect, shouldRedirect ? <Navigate to={redirectRoute} /> : <Outlet />);
  return shouldRedirect ? <Navigate to={redirectRoute} /> : <Outlet />;
};
