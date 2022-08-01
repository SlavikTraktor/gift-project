import Fastify from "fastify";
import fastifyMiddle from "@fastify/middie";
import { setUpEnvs } from "./config";

setUpEnvs();

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyMiddle);

fastify.register(
  (fastify, options, done) => {
    fastify.get("/", function (request, reply) {
      reply.send({ hello: "world1" });

    });

    fastify.get("/lul", function (request, reply) {
      reply.send({ hello: "world2" });

      // reply.code(405).send();
    });
    done();
  },
  { prefix: "/kek" }
);

// Run the server!
fastify.listen({ port: process.env.APP_PORT }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
