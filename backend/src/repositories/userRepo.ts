import { prisma } from "@/database/db";
import { Prisma, User } from "@prisma/client";

const getById = (id: number) =>
  prisma.user.findFirst({
    where: {
      id,
    },
  });

const getByName = async <T extends Prisma.UserFindFirstArgs>(
  name: string,
  args?: Prisma.SelectSubset<T, Prisma.UserFindFirstArgs>
) => {
  const res = await prisma.user.findFirst<
    Prisma.SelectSubset<T, Prisma.UserFindFirstArgs>
  >({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ...args!,
    where: { ...args?.where, name },
  });
  return res;
};

const addPartner = async (userId: number, partnerId: number) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      partnerId: partnerId,
    },
  });
};

const searchUsers = async (search: string, countToGet = 10) => {
  return prisma.$queryRaw<
    Pick<User, "id" | "name">[]
  >`SELECT id, name from User where lower(name) like '%' || ${search} || '%' limit ${countToGet}`;
};

export const userRepo = {
  getById,
  getByName,
  addPartner,
  searchUsers,
};
