import DiscordOAuth2 from "discord-oauth2";

const clientId = process.env.DISCORD_CLIENT_ID;
if (!clientId) {
  console.error("DISCORD_CLIENT_ID is not defined");
}

const clientSecret = process.env.DISCORD_CLIENT_SECRET;
if (!clientSecret) {
  console.error("DISCORD_CLIENT_SECRET is not defined");
}

const redirectUri = process.env.DISCORD_REDIRECT_URI;
if (!redirectUri) {
  console.error("DISCORD_REDIRECT_URI is not defined");
}

export const discordOauth2Client = () =>
  new DiscordOAuth2({
    clientId,
    clientSecret,
    redirectUri,
  });
