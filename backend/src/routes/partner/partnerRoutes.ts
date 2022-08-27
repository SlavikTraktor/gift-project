import { FastifyPluginCallback } from "fastify";
import { authorize } from "@middleware/authorize";
import { prisma } from "@/database/db";
import {
  SearchPatrnersType,
  SearchPatrnersValidation,
} from "./validations/SearchPatrnersValidation";
import { User } from "@prisma/client";

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
        Pick<User, 'id' | 'name'>[]
      >`SELECT id, name from User where lower(name) like '%' || ${search} || '%' limit 10`;

      res.send({ users: allUserNames });
    }
  );

  fastify.get("/partner", (req, res) => {
    res.send(req.user);
  });

  done();
};
