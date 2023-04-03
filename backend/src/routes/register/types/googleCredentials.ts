import { Static, Type } from "@sinclair/typebox";

export const GetGoogleCredentialValidation = Type.Object({
  code: Type.String(),
});

export type GetGoogleCredentialType = Static<typeof GetGoogleCredentialValidation>;
