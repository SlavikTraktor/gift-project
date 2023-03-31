import { OAuth2Client } from "google-auth-library";

export const oAuth2Client = () => new  OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI,
);
