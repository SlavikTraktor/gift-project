import { _post } from "@/heplers/api/fetch";

export const deleteWish = async (id: number) => {
  return await _post("/wish/delete", { id });
};
