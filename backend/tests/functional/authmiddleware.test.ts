import { app } from "@/app";
import tap from "tap";
import { createUser } from "tests/helpers/createUser";
import { generateAccessToken } from "tests/helpers/generateAccessToken";
import { getInject } from "tests/helpers/getInject";

tap.test("Auth middleware", async (t) => {
  const user = await createUser();
  const accessToken = generateAccessToken(user.id);

  t.test("without token returns 401", async (t) => {
    const response = await getInject(app, "/testprivate");

    t.equal(response.statusCode, 401);
  });

  t.test("with right token returns 200", async (t) => {
    const response = await getInject(
      app,
      "/testprivate",
      undefined,
      accessToken
    );

    t.equal(response.statusCode, 201);
  });

  t.test("with wrong token returns 401", async (t) => {
    const response = await getInject(
      app,
      "/testprivate",
      undefined,
      "wrongToken"
    );

    t.equal(response.statusCode, 401);
  });

  t.test("with right token with wrong userId returns 401", async (t) => {
    const accessToken = generateAccessToken(-1);
    const response = await getInject(
      app,
      "/testprivate",
      undefined,
      accessToken
    );

    t.equal(response.statusCode, 401);
  });

  t.end();
});
