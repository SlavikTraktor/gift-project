export interface Token {
  userId: number;
  token: string;
}

export let tokens: Token[] = [];

export const clearUserTokens = (userId: number) => {
  tokens = tokens.filter((v) => v.userId != userId);
};
