import { FastifyPluginCallback } from "fastify";
import { prisma } from "@/database/db";

import _ from "lodash";
import {
  DeleteWishType,
  DeleteWishValidation,
} from "./validations/DeleteWishValidation";

export const updateOrderRoute: FastifyPluginCallback = (
  fastify,
  options,
  done
) => {
  fastify.post<{
    Body: DeleteWishType;
  }>(
    "/delete",
    {
      schema: {
        body: DeleteWishValidation,
      },
    },
    async (req, res) => {
      const wishToDelete = await prisma.wish.findFirst({
        where: {
          id: req.body.id,
        },
      });

      if (!wishToDelete) {
        res.code(403);
        res.send("Wish not found");
        return;
      }

      if (wishToDelete?.userId !== req.user.id) {
        res.code(401);
        res.send("Not your wish");
        return;
      }

      await prisma.wish.delete({
        where: {
          id: req.body.id,
        },
      });

      res.send();
    }
  );

  done();
};
