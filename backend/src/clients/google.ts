import { OAuth2Client } from "google-auth-library";

const clientId = process.env.GOOGLE_CLIENT_ID;
if (!clientId) {
  console.error("GOOGLE_CLIENT_ID is not defined");
  process.exit(1);
}

const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
if (!clientId) {
  console.error("GOOGLE_CLIENT_SECRET is not defined");
  process.exit(1);
}

const redirectUri = process.env.GOOGLE_REDIRECT_URI;
if (!clientId) {
  console.error("GOOGLE_REDIRECT_URI is not defined");
  process.exit(1);
}

export const googleOauth2Client = () =>
  new OAuth2Client({
    clientId,
    clientSecret,
    redirectUri,
  });
