import { _post } from "@/heplers/api/fetch";

export const updateWishesOrder = async (wishes: number[]) => {
  return await _post("/wish/order", { wishesOrder: wishes });
};
