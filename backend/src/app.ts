import Fastify from "fastify";
import fastifyMiddle from "@fastify/middie";
import cors from '@fastify/cors'
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { setUpEnvs } from "./config";

import { authRoutes } from "@routes/auth";
import { partnerRoutes } from "@routes/partner";
import { testRoutes } from "@routes/test";
import { wishRoutes } from "@routes/wish/wishRoutes";

setUpEnvs();

const fastify = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

fastify.register(fastifyMiddle);

fastify.register(cors);

fastify.register(authRoutes, { prefix: "/auth" });
fastify.register(partnerRoutes, { prefix: "/partner" });
fastify.register(wishRoutes, { prefix: "/wish" });
fastify.register(testRoutes, { prefix: "/test" });

export const app = fastify;