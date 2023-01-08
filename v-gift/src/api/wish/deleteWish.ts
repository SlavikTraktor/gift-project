import { _post } from "@/heplers/api/fetch";

export const deleteWish = (id: number) => {
  return _post("/wish/delete", { id });
};
