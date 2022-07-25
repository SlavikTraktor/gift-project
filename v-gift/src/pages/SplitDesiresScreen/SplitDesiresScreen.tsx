import { useQuery } from "@tanstack/react-query";
import { getPartner } from "../../api/partner/getPartner";
import { PARTNER_QUERY } from "../../api/partner/partner";
import { DesireList } from "./DesireList";

export const SplitDesiresScreen = () => {
  const { data: partner, isLoading } = useQuery([PARTNER_QUERY], getPartner);

  if (isLoading) {
    return <>loading</>;
  }

  return (
    <div className="flex">
      <div className="flex-1">
        <DesireList name="Мой" editable={true} />
      </div>
      <div className="border-r-4 border-neutral-700"></div>
      <div className="flex-1">
        <DesireList name={partner as string} />
      </div>
    </div>
  );
};
