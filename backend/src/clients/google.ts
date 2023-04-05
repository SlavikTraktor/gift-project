import { OAuth2Client } from "google-auth-library";

if (!process.env.GOOGLE_CLIENT_ID) {
  console.error("GOOGLE_CLIENT_ID is not defined");
}
const clientId = process.env.GOOGLE_CLIENT_ID;

if (!process.env.GOOGLE_CLIENT_SECRET) {
  console.error("GOOGLE_CLIENT_SECRET is not defined");
}
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!process.env.GOOGLE_REDIRECT_URI) {
  console.error("GOOGLE_REDIRECT_URI is not defined");
}
const redirectUri = process.env.GOOGLE_REDIRECT_URI;


export const googleOauth2Client = () =>
  new OAuth2Client({
    clientId,
    clientSecret,
    redirectUri,
  });
