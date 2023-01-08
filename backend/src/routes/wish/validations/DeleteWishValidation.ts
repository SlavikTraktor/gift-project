import { Static, Type } from "@sinclair/typebox";

export const DeleteWishValidation = Type.Object({
  id: Type.Number(),
});

export type DeleteWishType = Static<typeof DeleteWishValidation>;
