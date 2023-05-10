import tap from "tap";
import mock from "mock-require";
import { getInject } from "tests/helpers/getInject";
import { reRequireApp } from "tests/helpers/reRequireApp";

mock("@/clients/google", {
  googleOauth2Client: () => ({
    generateAuthUrl: () => "kek",
  }),
});

const app = reRequireApp();

tap.test("GAuth test", async (t) => {
  t.test("/register/google returns 200", async (t) => {
    const response = await getInject(app, "/register/google");

    t.equal(response.statusCode, 200);
    t.equal(response.body, "kek");
  });
});
