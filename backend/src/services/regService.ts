import bcrypt from "bcrypt";
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
    throw new Error(`Username ${userName.name} already exists`);
  }

  if (userEmail) {
    throw new Error(`User with email: ${userEmail.email} already exists`);
  }
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(body.password, salt);

  await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      password,
    },
  });
};
