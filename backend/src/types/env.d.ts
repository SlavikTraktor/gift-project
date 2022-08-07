declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: number;
      AUTH_SECRET: string;
    }
  }
}

interface AuthenticatedUser {
  id: number;
}

declare module "fastify" {
  export interface FastifyRequest {
    user?: AuthenticatedUser;
  }
}

export {};
