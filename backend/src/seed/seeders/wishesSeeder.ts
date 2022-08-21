import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import _ from "lodash";

const WISHES_COUNT = 5;

export async function wishesSeeder(
  prisma: PrismaClient,
  userId: number,
  desiresCount = WISHES_COUNT
) {
  console.time("seedWishes");
  const wishIds = [];
  for (let i = 0; i < desiresCount; i++) {
    const title = `${faker.word.adjective()} ${faker.word.noun()}`;
    const wish = await prisma.wish.create({
      data: {
        title: _.capitalize(title),
        description: faker.lorem.sentence(),
        userId: userId,
      },
    });
    wishIds.push(wish.id);
    console.timeLog("seedWishes", `${wish.id} for user ${userId} created`);
  }

  console.timeEnd("seedWishes");

  return wishIds;
}
