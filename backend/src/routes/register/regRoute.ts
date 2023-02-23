import { regCredentials } from "@/services/regService";
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
  done();
};
