import { app } from "@/app";
import { prisma } from "@/database/db";
import { User, Wish } from "@prisma/client";
import { before } from "lodash";
import tap from "tap";
import { createUser } from "tests/helpers/createUser";
import { generateAccessToken } from "tests/helpers/generateAccessToken";
import { getInject } from "tests/helpers/getInject";

tap.test("Wish routes tests", async (t) => {
  let user: User;
  let wish: Wish;
  let accessToken: string;

  t.beforeEach(async (t) => {
    user = await createUser();
    wish = await prisma.wish.create({
      data: {
        userId: user.id,
        title: "usersWishTitle",
      },
    });
    accessToken = generateAccessToken(user.id);
  });

  t.test("get wishes returns users wishes", async (t) => {
    const response = await getInject(app, "/wish", undefined, accessToken);

    t.equal(response.statusCode, 200);
    const data = JSON.parse(response.body);
    t.equal(data.mine.length, 1);
    t.equal(data.mine[0].id, wish.id);
    t.equal(data.partners, null);
  });

  t.test("get wishes returns users wishes and partners", async (t) => {
    const partnerUser = await createUser();

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        partnerId: partnerUser.id,
      },
    });
    const partnersWish = await prisma.wish.create({
      data: {
        userId: partnerUser.id,
        title: "partnersWishTitle",
      },
    });
    const response = await getInject(app, "/wish", undefined, accessToken);

    t.equal(response.statusCode, 200);
    const data = JSON.parse(response.body);
    t.equal(data.mine.length, 1);
    t.equal(data.mine[0].id, wish.id);
    t.equal(data.partners.length, 1);
    t.equal(data.partners[0].id, partnersWish.id);
  });
});
