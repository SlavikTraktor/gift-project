import { FastifyPluginCallback } from "fastify";
import { prisma } from "@/database/db";

import { pick } from "lodash";
import {
  WISH_DEAFAULT_DESCRIPTION,
  WISH_DEAFAULT_TITLE,
} from "./constants/deafaultData";

export const createNewWishRoute: FastifyPluginCallback = (
  fastify,
  options,
  done
) => {
  fastify.post("/create", async (req, res) => {
    const newWish = await prisma.wish.create({
      data: {
        title: WISH_DEAFAULT_TITLE,
        userId: req.user.id,
        description: WISH_DEAFAULT_DESCRIPTION,
      },
    });

    res.send(pick(newWish, ["id", "titile", "description", "link"]));
  });

  done();
};
