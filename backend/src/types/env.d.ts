import { User } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: number;
      AUTH_SECRET: string;
      APP_ENV?: string;
      DATABASE_URL: string;
    }
  }
}

interface AuthenticatedUser {
  id: number;
}

declare module "fastify" {
  export interface FastifyRequest {
    user: User & {
      partner: User | null;
    };
  }
}

export {};
