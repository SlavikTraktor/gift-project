import { generateNewTokenPair } from "@services/authService";
import { discordOauth2Client } from "@/clients/discord";
import { prisma } from "@/database/db";

const scopes = ["identify", "email"];
const randomStateValue = Math.random().toString(16).substr(2);

export const regDiscordLink = async () => {
  const client = discordOauth2Client();
  const url = client.generateAuthUrl({
    scope: scopes,
    state: randomStateValue,
  });
  return url;
};

export const getDiscordTokenAndReg = async (code: string, state: string) => {
  if (state !== randomStateValue) {
    throw new Error("Invalid State parameter");
  }
  const client = discordOauth2Client();
  const tokens = await client.tokenRequest({
    code,
    grantType: "authorization_code",
    scope: scopes,
  });
  const data = await client.getUser(tokens.access_token);
  if (data.email == null) {
    throw new Error("Invalid Email parameter");
  }
  const user = await prisma.user.upsert({
    where: { email: data.email },
    create: {
      email: data.email,
      name: data.username,
      googleReg: true,
    },
    update: {},
  });
  return generateNewTokenPair(user.id);
};
