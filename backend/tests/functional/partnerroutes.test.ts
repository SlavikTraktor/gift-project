import { app } from "@/app";
import { prisma } from "@/database/db";
import tap from "tap";
import { createUser } from "tests/helpers/createUser";
import { generateAccessToken } from "tests/helpers/generateAccessToken";
import { getInject } from "tests/helpers/getInject";

tap.test("Partner routes", async (t) => {
  const partnerUser = await createUser();
  const user = await createUser(undefined, undefined, {
    partnerId: partnerUser.id,
  });
  const accessToken = generateAccessToken(user.id);

  t.test("search partner returns <= 10 partners", async (t) => {
    const users = [];
    for (let i = 0; i < 15; i++) {
      users.push(await createUser());
    }
    const response = await getInject(
      app,
      "/partner/search",
      { search: "a" },
      accessToken
    );

    t.equal(response.statusCode, 200);
    const partners = JSON.parse(response.body).users;
    t.ok(partners.length <= 10);
  });

  t.test("choose partner updates partner of user in DB", async (t) => {
    const user = await createUser();
    const userWithPartner = await prisma.user.findFirst({
      where: {
        id: user.id,
      },
      select: {
        partnerId: true,
      },
    });
    t.equal(null, userWithPartner?.partnerId);
    const accessToken = generateAccessToken(user.id);

    const response = await getInject(
      app,
      "/partner/choose",
      { partnerName: partnerUser.name },
      accessToken
    );

    t.equal(response.statusCode, 200);
    const userUpdated = await prisma.user.findFirst({
      where: {
        id: user.id,
      },
      select: {
        partnerId: true,
      },
    });

    t.equal(userUpdated?.partnerId, partnerUser.id);
  });

  t.test("choose partner but partner not found throws 403", async (t) => {
    const user = await createUser();
    const accessToken = generateAccessToken(user.id);

    const response = await getInject(
      app,
      "/partner/choose",
      { partnerName: "wrongPartnerName" },
      accessToken
    );

    t.equal(response.statusCode, 403);

    const userUpdated = await prisma.user.findFirst({
      where: {
        id: user.id,
      },
      select: {
        partnerId: true,
      },
    });
    t.equal(userUpdated?.partnerId, null);
  });

  t.test(
    "get partner when partner exists should return partner data",
    async (t) => {
      const response = await getInject(
        app,
        "/partner/partner",
        undefined,
        accessToken
      );

      t.equal(response.statusCode, 200);

      const partnerId = JSON.parse(response.body).id;
      t.equal(partnerId, partnerUser.id);
    }
  );

  t.test("get partner when no partner exists should return null", async (t) => {
    const accessToken = generateAccessToken(partnerUser.id);
    const response = await getInject(
      app,
      "/partner/partner",
      undefined,
      accessToken
    );

    t.equal(response.statusCode, 200);

    const partnerResponse = JSON.parse(response.body);
    t.equal(partnerResponse, null);
  });
});
