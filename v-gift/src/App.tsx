import React, { useMemo } from "react";
import { ChoosePartner } from "./pages/ChoosePartner";
import { useQuery } from "@tanstack/react-query";
import * as ls from "local-storage";

import { getPartner } from "./api/partner/getPartner";
import { PARTNER_QUERY } from "./api/partner/partner";
import { SplitDesiresScreen } from "./pages/SplitDesiresScreen/SplitDesiresScreen";
import { Route, Routes as ReactRouterRoutes } from "react-router-dom";
import { RedirectRoute } from "@/components/RedirectRoute";
import { Routes } from "./constants/routes";
import { LoginPage } from "./pages/LoginPage";

function App() {
  const partner = useQuery([PARTNER_QUERY], getPartner);

  const token = useMemo(() => {
    return ls.get<string>("refreshToken");
  }, []);

  if (partner.isLoading) {
    return null;
  }

  return (
    <div className="text-center">
      <ReactRouterRoutes>
        <Route
          path="/"
          element={
            <RedirectRoute
              shouldRedirect={!!token}
              redirectRoute={Routes.HOME}
            />
          }
        >
          <Route path={Routes.LOGIN} element={<LoginPage />} />
        </Route>
        <Route path="/" element={<RedirectRoute shouldRedirect={!token} />}>
          <Route path={Routes.PARTNER} element={<ChoosePartner />} />
          <Route path={Routes.HOME} element={<SplitDesiresScreen />} />
        </Route>
      </ReactRouterRoutes>
    </div>
  );
}

export default App;
