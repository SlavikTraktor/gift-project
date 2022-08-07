import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

export const authorize = async (req: FastifyRequest, res: FastifyReply) => {
  const authHeader = req.headers["authorization"];

  const auth = authHeader?.split(" ").at(1);

  if (!auth) {
    res.code(401);
    res.send("Not Authorized");
    return;
  }

  try {
    jwt.verify(auth, process.env.AUTH_SECRET);
  } catch (error) {
    res.code(401);
    res.send("Not Authorized");
    return;
  }

  const jwtData = jwt.decode(auth) as jwt.JwtPayload;
  req.user = {
    id: jwtData.id,
  };
};
