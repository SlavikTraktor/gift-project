import { authorize } from "@/middleware/authorize";
import { FastifyPluginCallback } from "fastify";

export const privateTestRoutes: FastifyPluginCallback = (
  fastify,
  options,
  done
) => {
  fastify.addHook("onRequest", authorize);

  fastify.get("/", async (req, res) => {
    res.send("YES");
  });

  done();
};
