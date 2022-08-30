import { _get } from "@/heplers/api/fetch";

export interface ChoosePartnerResponse {
  id: number;
  name: string;
}

export const choosePartner = (partnerName: string) => {
  return _get<ChoosePartnerResponse>("/partner/choose", {
    partnerName,
  });
};
