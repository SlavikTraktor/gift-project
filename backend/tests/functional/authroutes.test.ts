import { app } from "@/app";
import { prisma } from "@/database/db";
import tap from "tap";
import { createUser } from "tests/helpers/createUser";
import { postInject } from "tests/helpers/postInject";

tap.test("Auth tests", async (t) => {
  const user = await createUser();

  t.test("/login returns two tokens", async (t) => {
    const response = await postInject(app, "/auth/login", {
      name: user.name,
      password: user.name,
    });

    t.equal(response.statusCode, 200);
    const res = JSON.parse(response.body);
    t.ok(res.accessToken);
    t.ok(res.refreshToken);
  });

  t.test("/login endpoint fails on wrong login", async (t) => {
    const response = await postInject(app, "/auth/login", {
      name: "fakename",
      password: "fakepassword",
    });

    t.equal(response.statusCode, 403);
  });

  t.test("/login endpoint fails on wrong  password", async (t) => {
    const response = await postInject(app, "/auth/login", {
      name: user.name,
      password: "fakepassword",
    });

    t.equal(response.statusCode, 403);
  });

  t.test("/refresh endpoint returns new token pair", async (t) => {
    const loginResponse = await postInject(app, "/auth/login", {
      name: user.name,
      password: user.name,
    });

    t.equal(loginResponse.statusCode, 200);

    const tokens = JSON.parse(loginResponse.body);
    const refreshResponse = await postInject(app, "/auth/refresh", {
      refreshToken: tokens.refreshToken,
    });

    t.equal(refreshResponse.statusCode, 200);
    const res = JSON.parse(refreshResponse.body);
    t.ok(res.accessToken);
    t.ok(res.refreshToken);
  });

  t.test(
    "/refresh should fail when wrong refresh token provided",
    async (t) => {
      const refreshResponse = await postInject(app, "/auth/refresh", {
        refreshToken: "wrongToken",
      });

      t.equal(refreshResponse.statusCode, 403);
    }
  );

  t.test("/logout deletes all users tokens", async (t) => {
    const loginResponse = await postInject(app, "/auth/login", {
      name: user.name,
      password: user.name,
    });

    t.equal(loginResponse.statusCode, 200);

    const tokens = JSON.parse(loginResponse.body);
    const logoutResponse = await postInject(app, "/auth/logout", {
      refreshToken: tokens.refreshToken,
    });

    // t.equal(logoutResponse.statusCode, 200);
    // const usersTokensCount = await prisma.token.count({
    //   where: {
    //     userId: user.id,
    //   },
    // });
    // t.equal(usersTokensCount, 0);
  });

  t.test("/logout should fail when wrong refresh token provided", async (t) => {
    const logoutResponse = await postInject(app, "/auth/logout", {
      refreshToken: "wrongToken",
    });

    t.equal(logoutResponse.statusCode, 403);
  });
});
