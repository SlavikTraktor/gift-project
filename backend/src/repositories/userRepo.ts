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

const getByName = async <T extends Prisma.UserFindFirstArgs>(
  name: string,
  args?: Prisma.SelectSubset<T, Prisma.UserFindFirstArgs>
) => {
  const res = await prisma.user.findFirst<
    Prisma.SelectSubset<T, Prisma.UserFindFirstArgs>
  >({
    ...args!,
    where: { ...args?.where, name },
  });
  return res;
};

export const userRepo = {
  getById,
  getByName,
};
