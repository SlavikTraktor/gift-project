import { getWishes } from "@/api/wish/getWishes";
import { PARTNER_QUERY, WISHES_QUERY } from "@/constants/api";
import { Routes } from "@/constants/routes";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { getPartner } from "../../api/partner/getPartner";
import { WishesList } from "./WishesList";

export const SplitWishesScreen = () => {
  const { data, isLoading, isError } = useQuery([PARTNER_QUERY], getPartner);
  const {
    data: wishesData,
    isLoading: wishesLoading,
    isError: wishesError,
  } = useQuery([WISHES_QUERY], getWishes);

  if (isLoading || wishesLoading) {
    return <>loading</>;
  }

  if (isError || wishesError) {
    return <>error</>;
  }

  if (!data.data) {
    return <Navigate to={Routes.PARTNER} />;
  }

  return (
    <div className="flex">
      <div className="flex-1">
        <WishesList name="Мой" editable={true} wishes={wishesData.data.mine} />
      </div>
      <div className="border-r-4 border-main-250"></div>
      <div className="flex-1">
        <WishesList
          name={data.data.name}
          wishes={wishesData.data.partners ?? []}
        />
      </div>
    </div>
  );
};
