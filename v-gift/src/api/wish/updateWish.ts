import { _post } from "@/heplers/api/fetch";

export interface UpdateWishParams {
  id: number;
  title: string;
  description: string | null;
}

export const updateWish = (params: UpdateWishParams) => {
  return _post("/wish/save", { ...params });
};
