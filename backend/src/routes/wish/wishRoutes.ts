import { FastifyPluginCallback } from "fastify";
import { authorize } from "@middleware/authorize";
import { prisma } from "@/database/db";

import _ from "lodash";
import { updateOrderRoute } from "./updateOrderRoute";
import { createNewWishRoute } from "./createNewWishRoute";
import { wishSaveRoute } from "./wishSaveRoute";

export const wishRoutes: FastifyPluginCallback = (fastify, options, done) => {
  fastify.addHook("onRequest", authorize);

  fastify.get("/", async (req, res) => {
    const mine = await prisma.wish.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        order: "asc",
      },
    });

    const partners =
      !!req.user.partnerId &&
      (await prisma.wish.findMany({
        where: {
          userId: req.user.partnerId,
        },
      }));

    res.send({ mine, partners: partners || null });
  });

  fastify.register(wishSaveRoute);
  fastify.register(updateOrderRoute);
  fastify.register(createNewWishRoute);

  done();
};
