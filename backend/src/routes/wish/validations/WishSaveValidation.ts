import { Static, Type } from "@sinclair/typebox";

export const WishSaveValidation = Type.Object({
  id: Type.Number(),
  title: Type.String(),
  description: Type.Union([Type.String(), Type.Null()], { default: null }),
  color: Type.Union(
    [
      Type.String({
        maxLength: 7,
        minLength: 7,
      }),
      Type.Null(),
    ],
    { default: null },
  ),
});

export type WishSaveType = Static<typeof WishSaveValidation>;
