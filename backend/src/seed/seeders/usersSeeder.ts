import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const USERS_COUNT = 5;

export async function usersSeeder(
  prisma: PrismaClient,
  usersCount = USERS_COUNT
) {
  console.time("seedUsers");

  const userIds = [];
  for (let i = 0; i < usersCount; i++) {
    const username = `user${i+1}`;

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(username, salt);
    const user = await prisma.user.create({
      data: {
        name: username,
        password: password,
      },
    });
    userIds.push(user.id);
    console.timeLog("seedUsers", `${user.name} created`);
  }

  console.timeEnd("seedUsers");

  return userIds;
}
