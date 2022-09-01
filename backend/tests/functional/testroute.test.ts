import { app } from "@/app";
import { prisma } from "@/database/db";
import { test } from "tap";

test('requests the "/" route', async (t) => {
  const user = await prisma.user.create({
    data: {
      name: "user1",
      password: "user1",
    },
  });

  const response = await app.inject({
    method: "GET",
    url: "/test",
  });

  t.equal(JSON.parse(response.body).name, user.name);
});
