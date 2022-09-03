import { loginUser, logout, refreshAcessToken } from "@services/authService";
import { FastifyPluginCallback } from "fastify";
import { RefreshTokenType, RefreshTokenValidation } from "./types/refreshToken";

import { UserLoginValidation, UserLoginType } from "./types/userLogin";

export const authRoutes: FastifyPluginCallback = (fastify, options, done) => {
  fastify.post<{
    Body: RefreshTokenType;
  }>(
    "/refresh",
    {
      schema: {
        body: RefreshTokenValidation,
      },
    },
    async (req, res) => {
      try {
        return await refreshAcessToken(req.body.refreshToken);
      } catch (error) {
        res.code(403);
        res.send(error);
      }
    }
  );

  fastify.post<{
    Body: RefreshTokenType;
  }>(
    "/logout",
    {
      schema: {
        body: RefreshTokenValidation,
      },
    },
    async (req, res) => {
      try {
        await logout(req.body.refreshToken);
        res.send();
      } catch (error) {
        res.code(403);
        res.send(error);
      }
    }
  );

  fastify.post<{
    Body: UserLoginType;
  }>(
    "/login",
    {
      schema: {
        body: UserLoginValidation,
      },
    },
    async (req, res) => {
      try {
        const tokens = await loginUser(req.body.name, req.body.password);
        res.send(tokens);
      } catch (error) {
        res.code(403);
        res.send(error);
      }
    }
  );

  done();
};
