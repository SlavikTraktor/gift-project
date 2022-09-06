import { Static, Type } from "@sinclair/typebox";

export const UpdateOrderValidation = Type.Object({
  wishesOrder: Type.Array(Type.Number()),
});

export type UpdateOrderType = Static<typeof UpdateOrderValidation>;
