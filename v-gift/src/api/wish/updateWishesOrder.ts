import { _post } from "@/heplers/api/fetch";

export const updateWishesOrder = (wishes: number[]) => {
  return _post("/wish/order", { wishesOrder: wishes });
};
