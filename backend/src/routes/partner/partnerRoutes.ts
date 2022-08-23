import { FastifyPluginCallback } from "fastify";
import { authorize } from "@middleware/authorize";

export const partnerRoutes: FastifyPluginCallback = (fastify, options, done) => {
  fastify.addHook("onRequest", authorize);

  fastify.get("/partner", (req, res) => {
    res.send(req.user);
  });

  done();
};
