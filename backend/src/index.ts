import Fastify from "fastify";
import fastifyMiddle from "@fastify/middie";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { setUpEnvs } from "./config";

import { authRoutes } from "@routes/auth";
import { partnerRoutes } from "@routes/partner";

setUpEnvs();

const fastify = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

fastify.register(fastifyMiddle);

fastify.register(authRoutes, { prefix: "/auth" });

fastify.register(partnerRoutes, { prefix: "/partner" });

// Run the server!
fastify.listen({ port: process.env.APP_PORT }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
