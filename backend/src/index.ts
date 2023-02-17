import { app as fastify } from "@/app";

// Run the server!
fastify.listen({ port: process.env.APP_PORT }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
