import { FastifyPluginCallback } from "fastify";
import { prisma } from "@/database/db";

import {
  UpdateOrderType,
  UpdateOrderValidation,
} from "./validations/UpdateOrderValidation";
import { Wish } from "@prisma/client";

const isUserOwner = (wishes: Wish[], userId: number) => {
  return !wishes.some((v) => v.userId !== userId);
};

export const updateOrderRoute: FastifyPluginCallback = (
  fastify,
  options,
  done
) => {
  fastify.post<{
    Body: UpdateOrderType;
  }>(
    "/order",
    {
      schema: {
        body: UpdateOrderValidation,
      },
    },
    async (req, res) => {
      const newOrder = req.body.wishesOrder;
      const wishesToUpdate = await prisma.wish.findMany({
        where: {
          id: {
            in: req.body.wishesOrder,
          },
        },
      });

      if (!isUserOwner(wishesToUpdate, req.user.id)) {
        res.code(401);
        res.send("Not your wishes");
        return;
      }

      const updateWishesOrders = newOrder.map((id, i) => {
        return prisma.wish.update({
          where: {
            id,
          },
          data: {
            order: i + 1,
          },
        });
      });

      await prisma.$transaction(updateWishesOrders);

      res.send();
    }
  );

  done();
};
