import { Static, Type } from "@sinclair/typebox";

export const GetDiscordCredentialValidation = Type.Object({
  code: Type.String(),
  state: Type.String(),
});

export type GetDiscordCredentialType = Static<typeof GetDiscordCredentialValidation>;
