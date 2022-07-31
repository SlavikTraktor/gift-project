import React from "react";
import { ChoosePartner } from "./pages/ChoosePartner";
import { useQuery } from "@tanstack/react-query";

import { getPartner } from "./api/partner/getPartner";
import { PARTNER_QUERY } from "./api/partner/partner";
import { SplitDesiresScreen } from "./pages/SplitDesiresScreen/SplitDesiresScreen";
import { Routes } from "react-router-dom";

function App() {
  const partner = useQuery([PARTNER_QUERY], getPartner);

  if (partner.isLoading) {
    return null;
  }

  return (
    <div className="text-center">
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes> */}
      {partner.data ? <SplitDesiresScreen /> : <ChoosePartner />}
    </div>
  );
}

export default App;
