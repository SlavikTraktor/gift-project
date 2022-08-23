import { Routes } from "@/constants/routes";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { getPartner } from "../../api/partner/getPartner";
import { PARTNER_QUERY } from "../../api/partner/partner";
import { DesireList } from "./DesireList";

export const SplitDesiresScreen = () => {
  const { data, isLoading, isError } = useQuery([PARTNER_QUERY], getPartner);

  if (isLoading) {
    return <>loading</>;
  }

  if (isError) {
    return <>error</>;
  }

  if (!data.data.partner) {
    return <Navigate to={Routes.PARTNER} />;
  }

  return (
    <div className="flex">
      <div className="flex-1">
        <DesireList name="Мой" editable={true} />
      </div>
      <div className="border-r-4 border-neutral-700"></div>
      <div className="flex-1">
        <DesireList name={"Partner"} />
      </div>
    </div>
  );
};
