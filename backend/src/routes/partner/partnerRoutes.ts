import { FastifyPluginCallback } from "fastify";
import { authorize } from "@middleware/authorize";
import { prisma } from "@/database/db";
import {
  SearchPatrnersType,
  SearchPatrnersValidation,
} from "./validations/SearchPatrnersValidation";
import { User } from "@prisma/client";
import {
  ChoosePatrnerValidation,
  ChoosePatrnerType,
} from "./validations/ChoosePartnerValidation";
import _ from "lodash";
import { userRepo } from "@/repositories/userRepo";

export const partnerRoutes: FastifyPluginCallback = (
  fastify,
  options,
  done
) => {
  fastify.addHook("onRequest", authorize);

  fastify.get<{
    Querystring: SearchPatrnersType;
  }>(
    "/search",
    {
      schema: {
        querystring: SearchPatrnersValidation,
      },
    },
    async (req, res) => {
      const search = req.query.search.toLowerCase();
      const allUserNames = await prisma.$queryRaw<
        Pick<User, "id" | "name">[]
      >`SELECT id, name from User where lower(name) like '%' || ${search} || '%' limit 10`;

      res.send({ users: allUserNames });
    }
  );

  fastify.get<{
    Querystring: ChoosePatrnerType;
  }>(
    "/choose",
    {
      schema: {
        querystring: ChoosePatrnerValidation,
      },
    },
    async (req, res) => {
      const newPartner = await userRepo.getByName(req.query.partnerName, {
        select: {
          id: true,
          name: true,
        },
      });

      if (!newPartner) {
        throw new Error();
      }

      await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: {
          partnerId: newPartner.id,
        },
      });
      res.send(newPartner);
    }
  );

  fastify.get("/partner", (req, res) => {
    res.send(_.pick(req.user.partner, ["id", "name"]));
  });

  done();
};
