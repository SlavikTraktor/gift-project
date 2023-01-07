import { Static, Type } from "@sinclair/typebox";

export const WishSaveValidation = Type.Object({
  id: Type.Number(),
  title: Type.String(),
  description: Type.Union([Type.String(), Type.Null()], { default: null }),
});

export type WishSaveType = Static<typeof WishSaveValidation>;
