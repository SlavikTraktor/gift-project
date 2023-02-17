import { FastifyPluginCallback } from "fastify";
import { authorize } from "@middleware/authorize";
import {
  SearchPatrnersType,
  SearchPatrnersValidation,
} from "./validations/SearchPatrnersValidation";
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
      const allUserNames = await userRepo.searchUsers(search);

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
      const newPartner = await userRepo.getByName(req.query.partnerName);

      if (!newPartner) {
        res.code(403);
        res.send("Partner not found");
        return;
      }

      await userRepo.addPartner(req.user.id, newPartner.id);
      res.send(_.pick(newPartner, ["id", "name"]));
    }
  );

  fastify.get("/partner", (req, res) => {
    res.send(
      req.user.partner ? _.pick(req.user.partner, ["id", "name"]) : null
    );
  });

  done();
};
