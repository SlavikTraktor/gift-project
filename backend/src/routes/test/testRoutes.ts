import { FastifyPluginCallback } from "fastify";
import { kek } from "./test";

export const testRoutes: FastifyPluginCallback = (fastify, options, done) => {
  fastify.get("/", async (req, res) => {
    await kek();
    res.send("YES");
  });

  done();
};
