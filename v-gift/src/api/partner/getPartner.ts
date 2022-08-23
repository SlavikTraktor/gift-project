import { _get } from "@/heplers/api/fetch";

interface GetPartnerProps {
  partner: null | any;
}

export const getPartner = () => {
  return _get<GetPartnerProps>("/partner/partner");
};
