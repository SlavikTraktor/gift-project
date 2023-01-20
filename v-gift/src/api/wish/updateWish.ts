import { _post } from "@/heplers/api/fetch";

export interface UpdateWishParams {
  id: number;
  title: string;
  description: string | null;
}

export const updateWish = async (params: UpdateWishParams) => {
  return await _post("/wish/save", { ...params });
};
