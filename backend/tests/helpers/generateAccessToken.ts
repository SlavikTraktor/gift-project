import jwt from "jsonwebtoken";
import path from "path";
import dotenv from "dotenv";

export const generateAccessToken = (userId: number) => {
  dotenv.config({
    path: path.resolve(process.cwd(), ".env.test"),
    override: true,
  });

  return jwt.sign({ id: userId }, process.env.AUTH_SECRET, {
    expiresIn: "30m",
  });
};
