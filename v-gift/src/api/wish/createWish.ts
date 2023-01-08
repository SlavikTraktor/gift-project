import { _post } from "@/heplers/api/fetch";

export interface CreateWishParams {
  title?: string;
  description?: string;
}

export const createWish = (params?: CreateWishParams) => {
  const postParams = params ? { ...params }: undefined;
  return _post("/wish/create", postParams);
};
