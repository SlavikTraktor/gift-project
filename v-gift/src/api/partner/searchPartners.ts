import { _get } from "@/heplers/api/fetch";

export interface SearchPartnersRes {
  users: {
    id: number;
    name: string;
  }[];
}

export const searchPartners = (search: string) => {
  return _get<SearchPartnersRes>("/partner/search", { search });
};
