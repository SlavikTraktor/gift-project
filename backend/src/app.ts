import Fastify from "fastify";
import fastifyMiddle from "@fastify/middie";
import cors from "@fastify/cors";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { setUpEnvs } from "./config";


import { authRoutes } from "@routes/auth";
import { partnerRoutes } from "@routes/partner";
import { privateTestRoutes, testRoutes } from "@routes/test";
import { wishRoutes } from "@routes/wish/wishRoutes";
import { regRoutes } from "./routes/register/regRoute";

setUpEnvs();

const fastify = Fastify({
  logger: process.env.APP_ENV === "dev",
}).withTypeProvider<TypeBoxTypeProvider>();

fastify.register(fastifyMiddle);

fastify.register(cors);

fastify.register(regRoutes, { prefix: "/register" });
fastify.register(authRoutes, { prefix: "/auth" });
fastify.register(partnerRoutes, { prefix: "/partner" });
fastify.register(wishRoutes, { prefix: "/wish" });
fastify.register(testRoutes, { prefix: "/test" });
fastify.register(privateTestRoutes, { prefix: "/testprivate" });

export default fastify;
