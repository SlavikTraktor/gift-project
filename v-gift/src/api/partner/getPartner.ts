import { _get } from "@/heplers/api/fetch";

export const getPartner = () => {
  return _get<string>("/partner/partner");
};
