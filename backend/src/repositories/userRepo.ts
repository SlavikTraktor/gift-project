import { prisma } from "@/database/db";
import { generateObjectFilledTrue } from "@/helpers/generateSelect";
import { Prisma, User } from "@prisma/client";

const getById = (id: number, select?: (keyof Prisma.UserSelect)[]) =>
  prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
    },
  });

const getByName = async <U extends Prisma.UserSelect>(
  name: string,
  select?: U
) => {
  const res = await prisma.user.findFirst<{
    where: Prisma.UserWhereInput;
    select: U;
  }>({
    select: select!,
    where: { name },
  });
  return res;
};

export const userRepo = {
  getById,
  getByName,
};
