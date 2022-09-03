import { prisma } from "@/database/db";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 } from "uuid";

/**
 * Password is name
 */
export const createUser = async (
  name?: string,
  password?: string,
  data?: Partial<Prisma.UserCreateArgs["data"]>
) => {
  const username = name || v4();
  const salt = await bcrypt.genSalt(10);
  const passwordRes = await bcrypt.hash(password || username, salt);

  return await prisma.user.create({
    data: {
      ...data,
      name: username,
      password: passwordRes,
    },
  });
};
