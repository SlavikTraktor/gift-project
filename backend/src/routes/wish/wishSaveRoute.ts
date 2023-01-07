import { FastifyPluginCallback } from "fastify";
import { prisma } from "@/database/db";

import _ from "lodash";
import { Wish } from "@prisma/client";
import {
  WishSaveType,
  WishSaveValidation,
} from "./validations/WishSaveValidation";

export const wishSaveRoute: FastifyPluginCallback = (
  fastify,
  options,
  done
) => {
  fastify.post<{
    Body: WishSaveType;
  }>(
    "/save",
    {
      schema: {
        body: WishSaveValidation,
      },
    },
    async (req, res) => {
      const wishToUpdate = await prisma.wish.findFirst({
        where: {
          id: req.body.id,
        },
      });

      if (!wishToUpdate) {
        res.code(403);
        res.send("Wish not found");
        return;
      }

      if (wishToUpdate.userId !== req.user.id) {
        res.code(401);
        res.send("Not your wishes");
        return;
      }

      await prisma.wish.update({
        where: {
          id: req.body.id,
        },
        data: {
          title: req.body.title,
          description: req.body.description,
        },
      });

      res.send();
    }
  );

  done();
};
