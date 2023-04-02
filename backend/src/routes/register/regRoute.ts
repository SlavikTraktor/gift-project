import { regCredentials } from "@/services/regService";
import {
  getGoogleTokenAndReg,
  regGoogleLink,
} from "@/services/authGoogleService";
import { FastifyPluginCallback } from "fastify";
import {
  PostCredentialType,
  PostCredentialValidation,
} from "./types/postCredentials";
import {
  getDiscordTokenAndReg,
  regDiscordLink,
} from "@/services/authDiscordService";

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
    res.send(await regGoogleLink());
  });

  fastify.get<{ Querystring: { code: string } }>(
    "/google/callback",
    async (req, res) => {
      console.log(req.query);
      try {
        const tokens = await getGoogleTokenAndReg(req.query.code);
        res.send(tokens);
      } catch (error) {
        res.code(403);
        res.send(error);
      }
    },
  );

  fastify.get("/discord", async (req, res) => {
    res.send(await regDiscordLink());
  });

  fastify.get<{ Querystring: { code: string; state: string } }>(
    "/discord/callback",
    async (req, res) => {
      console.log(req.query);
      try {
        const tokens = await getDiscordTokenAndReg(
          req.query.code,
          req.query.state,
        );
        res.send(tokens);
      } catch (error) {
        res.code(403);
        res.send(error);
      }
    },
  );
  done();
};
