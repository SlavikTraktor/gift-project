/* eslint-disable */
const { execSync } = require("child_process");
const fs = require("fs");

try {
  fs.unlinkSync("./prisma/test.db");
} catch (error) {}
try {
  fs.unlinkSync("./prisma/test.db-journal");
} catch (error) {}
execSync("npm run migrate:test");
