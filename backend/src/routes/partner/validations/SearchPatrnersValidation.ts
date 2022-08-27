import { Static, Type } from "@sinclair/typebox";

export const SearchPatrnersValidation = Type.Object({
  search: Type.String(),
});

export type SearchPatrnersType = Static<typeof SearchPatrnersValidation>;
