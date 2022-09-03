import { app } from "@/app";
import tap from "tap";
import { createUser } from "tests/helpers/createUser";

tap.test("Test routes", async (t) => {
  let user = await createUser();

  t.test('requests the "/test" route', async (t) => {
    const response = await app.inject({
      method: "GET",
      url: "/test",
    });

    t.ok(JSON.parse(response.body).name);
  });

  t.end();
});
