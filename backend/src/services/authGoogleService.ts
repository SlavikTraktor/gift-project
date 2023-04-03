import { generateNewTokenPair } from "@services/authService";
import { googleOauth2Client } from "@/clients/google";
import { prisma } from "@/database/db";
import { getGoogleInfo } from "@/requests/googleRequests";

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

export const regGoogleLink = async () => {
  const client = googleOauth2Client();
  const url = client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  return url;
};

export const getGoogleTokenAndReg = async (code: string) => {
  const client = googleOauth2Client();
  const { tokens } = await client.getToken(code);
  client.setCredentials({
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
  });
  const { data } = await getGoogleInfo(client);
  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });
  if (!user) {
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        googleReg: true,
      },
    });
    return generateNewTokenPair(newUser.id);
  }
  return generateNewTokenPair(user.id);
};
