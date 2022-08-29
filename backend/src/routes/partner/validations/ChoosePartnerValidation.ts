import { Static, Type } from "@sinclair/typebox";

export const ChoosePatrnerValidation = Type.Object({
  partnerName: Type.String(),
});

export type ChoosePatrnerType = Static<typeof ChoosePatrnerValidation>;
