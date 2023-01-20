import { _get } from "@/heplers/api/fetch";
import { WishType } from "@/types/Wish";

export interface GetWishesResponse {
  partners: WishType[] | null;
  mine: WishType[];
}

export const getWishes = async () => {
  return await _get<GetWishesResponse>("/wish");
};
