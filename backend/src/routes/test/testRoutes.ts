
import { prisma } from "@/database/db";
import { FastifyPluginCallback } from "fastify";

export const testRoutes: FastifyPluginCallback = (fastify, options, done) => {
  fastify.get("/", async (req, res) => {
    const user = await prisma.user.findFirst();
    res.send(user);
  });

  done();
};
