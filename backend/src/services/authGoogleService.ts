import { OAuth2Client } from "google-auth-library";
import { prisma } from "@/database/db";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";

const CLIENT_ID =
  "133300448301-7jr985i9aljbqdbf27okphk58b2f987n.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3008/register/google/callback";

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

export const regGoogleLink = async () => {
  const url = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  return url;
};

export const getGoogleTokenAndReg = async (code: unknown) => {
  const { tokens } = await oAuth2Client.getToken(code as string);
  oAuth2Client.setCredentials({
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
  });
  interface GoogleUser {
    email: string;
    name: string;
    picture: string;
  }
  const { data } = await oAuth2Client.request<GoogleUser>({
    url: "https://www.googleapis.com/oauth2/v3/userinfo",
  });

  const userF = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });
  if (!userF) {
    const userC = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        googleReg: true,
      },
    });
    return generateNewTokenPair(userC.id);
  }
  return generateNewTokenPair(userF.id);
};

const generateNewTokenPair = async (userId: number) => {
  const accessToken = jwt.sign({ id: userId }, process.env.AUTH_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = await createRefreshToken(userId);

  return {
    accessToken,
    refreshToken,
  };
};

const createRefreshToken = async (userId: number) => {
  const token = v4();

  await prisma.token.create({
    data: {
      refreshToken: token,
      userId,
    },
  });

  return token;
};