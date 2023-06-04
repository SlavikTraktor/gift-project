/* eslint-disable @typescript-eslint/no-explicit-any */
"use strict";

// Read the .env file.
import * as dotenv from "dotenv";
dotenv.config();

// Require the framework
import Fastify from "fastify";

import appInternal from "../dist/src/app.js";

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
app.register(appInternal);

export default async (req, res) => {
  await app.ready();
  app.server.emit("request", req, res);
};
