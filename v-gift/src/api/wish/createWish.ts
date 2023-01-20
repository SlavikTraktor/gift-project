import { _post } from "@/heplers/api/fetch";

export interface CreateWishParams {
  title?: string;
  description?: string;
}

export const createWish = async (params?: CreateWishParams) => {
  const postParams = params ? { ...params } : undefined;
  return await _post("/wish/create", postParams);
};
