import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import { prisma } from "@/database/db";
import bcrypt from "bcrypt";

export const loginUser = async (name: string, pass: string) => {
  const user = await prisma.user.findFirst({
    where: {
      name: {
        equals: name,
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const validatePassword = await bcrypt.compare(pass, user.password);
  if (!validatePassword) {
    throw new Error("Invalid password");
  }

  return generateNewTokenPair(user.id);
};

export const refreshAcessToken = async (refreshToken: string) => {
  const token = await prisma.token.findFirst({
    where: {
      refreshToken,
    },
  });
  if (!token) {
    throw new Error("User not found");
  }

  const pair = await generateNewTokenPair(token.userId);

  await prisma.token.delete({
    where: {
      id: token.id,
    },
  });

  return pair;
};

export const logout = async (refreshToken: string) => {
  const token = await prisma.token.findFirst({
    where: {
      refreshToken,
    },
  });
  if (!token) {
    throw new Error("User not found");
  }

  await prisma.token.deleteMany({
    where: {
      userId: token.userId,
    },
  });
};

const generateNewTokenPair = async (userId: number) => {
  const accessToken = jwt.sign({ id: userId }, process.env.AUTH_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = await createRefreshToken(userId);

  return {
    accessToken,
    refreshToken,
  };
};

const createRefreshToken = async (userId: number) => {
  const token = v4();

  await prisma.token.create({
    data: {
      refreshToken: token,
      userId,
    },
  });

  return token;
};
