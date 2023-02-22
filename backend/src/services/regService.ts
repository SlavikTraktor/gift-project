import { prisma } from "@/database/db";

export const regCredentials = async (body: {
  name: string;
  email: string;
  password: string;
}) => {
  const userName = await prisma.user.findFirst({
    where: {
      name: body.name,
    },
  });

  const userEmail = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (userName) {
    throw new Error(`Username ${userName} already exists`);
  }

  if (userEmail) {
    throw new Error(`User with email: ${userEmail} already exists`);
  }

  await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      password: body.password,
    },
  });
};
