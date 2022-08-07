import { Static, Type } from "@sinclair/typebox";

export const RefreshTokenValidation = Type.Object({
  refreshToken: Type.String(),
});

export type RefreshTokenType = Static<typeof RefreshTokenValidation>;
