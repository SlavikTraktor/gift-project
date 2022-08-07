import { useMemo } from "react";
import * as ls from "local-storage";
import { Navigate, Outlet } from "react-router-dom";
import { Routes } from "../../constants/routes";

export const PrivateRoute = () => {
  const token = useMemo(() => {
    return ls.get<string>("refreshToken");
  }, []);

  return (
    <>
      {token ? (
        <Outlet />
      ) : (
        <Navigate to={Routes.LOGIN} />
      )}
    </>
  );
};
