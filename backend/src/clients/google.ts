import { OAuth2Client } from "google-auth-library";

const clientId = process.env.GOOGLE_CLIENT_ID;
if (!clientId) {
  console.error("GOOGLE_CLIENT_ID is not defined");
}

const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
if (!clientSecret) {
  console.error("GOOGLE_CLIENT_SECRET is not defined");
}

const redirectUri = process.env.GOOGLE_REDIRECT_URI;
if (!redirectUri) {
  console.error("GOOGLE_REDIRECT_URI is not defined");
}

export const googleOauth2Client = () =>
  new OAuth2Client({
    clientId,
    clientSecret,
    redirectUri,
  });
