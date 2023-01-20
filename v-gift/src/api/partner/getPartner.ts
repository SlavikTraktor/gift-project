import { _get } from "@/heplers/api/fetch";

interface GetPartnerProps {
  id: number;
  name: string;
}

export const getPartner = async () => {
  return await _get<GetPartnerProps | null>("/partner/partner");
};
