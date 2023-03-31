import { regCredentials } from "@/services/regService";
import { getGoogleTokenAndReg, regGoogleLink } from "@/services/authGoogleService";
import { FastifyPluginCallback } from "fastify";
import {
  PostCredentialType,
  PostCredentialValidation,
} from "./types/postCredentials";

export const regRoutes: FastifyPluginCallback = (fastify, options, done) => {
  fastify.post<{
    Body: PostCredentialType;
  }>(
    "/",
    {
      schema: {
        body: PostCredentialValidation,
      },
    },
    async (req, res) => {
      try {
        await regCredentials(req.body);
      } catch (error) {
        res.code(403);
        res.send(error);
      }
    },
  );

  fastify.get("/google", async (req, res) => {
    //const url = await regGoogleLink();
    res.send(await regGoogleLink());
  });

  fastify.get("/google/callback", async (req, res) => {
    try {
      const tokens = await getGoogleTokenAndReg(req.query);
      res.send(tokens);
    } catch (error) {
      res.code(403);
      res.send(error);
    }
  });
  done();
};
