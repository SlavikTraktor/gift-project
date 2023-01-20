import { _get } from "@/heplers/api/fetch";

interface SearchPartner {
  id: number;
  name: string;
}

export interface SearchPartnersRes {
  users: SearchPartner[];
}

export const searchPartners = async (search: string) => {
  return await _get<SearchPartnersRes>("/partner/search", { search });
};
