import { _get } from "@/heplers/api/fetch";

export interface ChoosePartnerResponse {
  id: number;
  name: string;
}

export const choosePartner = async (partnerName: string) => {
  return await _get<ChoosePartnerResponse>("/partner/choose", {
    partnerName,
  });
};
