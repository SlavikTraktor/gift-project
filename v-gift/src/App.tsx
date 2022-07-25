import React from "react";
import { ChoosePartner } from "./pages/ChoosePartner";
import { useQuery } from "@tanstack/react-query";

import { getPartner } from "./api/partner/getPartner";
import { PARTNER_QUERY } from "./api/partner/partner";
import { SplitDesiresScreen } from "./pages/SplitDesiresScreen/SplitDesiresScreen";

function App() {
  const partner = useQuery([PARTNER_QUERY], getPartner);

  if (partner.isLoading) {
    return null;
  }

  return (
    <div className="text-center">
      {partner.data ? <SplitDesiresScreen /> : <ChoosePartner />}
    </div>
  );
}

export default App;
