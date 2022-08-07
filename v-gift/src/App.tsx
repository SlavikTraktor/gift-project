import React from "react";
import { ChoosePartner } from "./pages/ChoosePartner";
import { useQuery } from "@tanstack/react-query";

import { getPartner } from "./api/partner/getPartner";
import { PARTNER_QUERY } from "./api/partner/partner";
import { SplitDesiresScreen } from "./pages/SplitDesiresScreen/SplitDesiresScreen";
import { Route, Routes as ReactRouterRoutes } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { Routes } from "./constants/routes";
import { LoginPage } from "./pages/LoginPage";

function App() {
  const partner = useQuery([PARTNER_QUERY], getPartner);

  if (partner.isLoading) {
    return null;
  }

  return (
    <div className="text-center">
      <ReactRouterRoutes>
        <Route path={Routes.LOGIN} element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path={Routes.PARTNER} element={<ChoosePartner />} />
          <Route path={Routes.HOME} element={<SplitDesiresScreen />} />
        </Route>
      </ReactRouterRoutes>
      {/* {partner.data ? <SplitDesiresScreen /> : <ChoosePartner />} */}
    </div>
  );
}

export default App;
