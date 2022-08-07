import { Static, Type } from "@sinclair/typebox";

export const UserLoginValidation = Type.Object({
  name: Type.String({ minLength: 3 }),
  password: Type.String({ minLength: 5 }),
});

export type UserLoginType = Static<typeof UserLoginValidation>;
