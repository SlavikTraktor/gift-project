import { PrismaClient } from "@prisma/client";
import { usersSeeder } from "./seeders/usersSeeder";
import { wishesSeeder } from "./seeders/wishesSeeder";

const prisma = new PrismaClient();

const seedUsersWithWishes = async () => {
  const userIds = await usersSeeder(prisma);

  for (let i = 0; i < userIds.length; i++) {
    await wishesSeeder(prisma, userIds[i]);
  }
};

seedUsersWithWishes();