import dotenv from "dotenv";
import path from "path";

export function setUpEnvs() {
  if (process.env.APP_ENV === "test") {
    dotenv.config({
        path: path.resolve(process.cwd(), '.env.test'),
        override: true,
    });
    return;
  }

  dotenv.config();
}
