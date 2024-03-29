import React from "react";
import { ChoosePartner } from "./pages/ChoosePartner";
import { useQuery } from "@tanstack/react-query";
import * as ls from "local-storage";
import { SplitWishesScreen } from "./pages/SplitWishesScreen/SplitWishesScreen";
import { Route, Routes as ReactRouterRoutes } from "react-router-dom";
import { RedirectRoute } from "@/components/RedirectRoute";
import { Routes } from "./constants/routes";
import { LoginPage } from "@/pages/LoginPage";
import { TestPage } from "@/pages/TestPage";
import { GETAUTH_QUERY } from "./constants/api";
import { RegistrationPage } from "./pages/RegistrationPage";

function App() {
  const token = useQuery([GETAUTH_QUERY], () => {
    return ls.get<string>("refreshToken");
  });
  if (token.isLoading) {
    return <>Loading</>;
  }

  return (
    <div className="text-center">
      <ReactRouterRoutes>
        <Route
          path="/"
          element={<RedirectRoute shouldRedirect={!token.data} />}
        >
          <Route path={Routes.PARTNER} element={<ChoosePartner />} />
          <Route path={Routes.HOME} element={<SplitWishesScreen />} />
          <Route path={Routes.TEST} element={<TestPage />} />
        </Route>

        <Route
          path="/"
          element={
            <RedirectRoute
              shouldRedirect={!!token.data}
              redirectRoute={Routes.HOME}
            />
          }
        >
          <Route path={Routes.LOGIN} element={<LoginPage />} />
          <Route path={Routes.REGISTRATION} element={<RegistrationPage />} />
        </Route>
      </ReactRouterRoutes>
    </div>
  );
}

export default App;
