import { users } from "@models/user";
import { clearUserTokens, tokens } from "@models/refreshToken";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";

export const loginUser = (name: string, pass: string) => {
  const user = users.find((v) => v.username === name && v.password === pass);

  if (!user) {
    throw new Error("User not found");
  }

  return generateNewTokenPair(user.id);
};

export const refreshAcessToken = (refreshToken: string) => {
  const userTokenIndex = tokens.findIndex((v) => v.token === refreshToken);
  if (userTokenIndex === -1) {
    throw new Error("User not found");
  }

  const pair = generateNewTokenPair(tokens[userTokenIndex].userId);
  tokens[userTokenIndex].token = pair.refreshToken;

  return pair;
};

export const logout = (refreshToken: string) => {
  const token = tokens.find((v) => v.token === refreshToken);
  if (!token) {
    throw new Error("User not found");
  }

  clearUserTokens(token.userId);
};

const generateNewTokenPair = (userId: number) => {
  const accessToken = jwt.sign({ id: userId }, process.env.AUTH_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = createRefreshToken(userId);

  return {
    accessToken,
    refreshToken,
  };
};

const createRefreshToken = (userId: number) => {
  const token = v4();

  tokens.push({ userId, token });

  return token;
};
