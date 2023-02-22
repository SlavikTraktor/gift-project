import { Static, Type } from "@sinclair/typebox";

export const PostCredentialValidation = Type.Object({
  name: Type.String({
    minLength: 3,
    maxLength: 25,
  }),
  email: Type.String({
    minLength: 8,
    maxLength: 25,
  }),
  password: Type.String({
    minLength: 8,
    maxLength: 25,
  }),
});

export type PostCredentialType = Static<typeof PostCredentialValidation>;
