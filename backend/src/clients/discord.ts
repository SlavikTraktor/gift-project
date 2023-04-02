import DiscordOAuth2 from "discord-oauth2";

const clientId = process.env.DISCORD_CLIENT_ID;
if (!clientId) {
  console.error("DISCORD_CLIENT_ID is not defined");
  process.exit(1);
}

const clientSecret = process.env.DISCORD_CLIENT_SECRET;
if (!clientId) {
  console.error("DISCORD_CLIENT_SECRET is not defined");
  process.exit(1);
}

const redirectUri = process.env.DISCORD_REDIRECT_URI;
if (!clientId) {
  console.error("DISCORD_REDIRECT_URI is not defined");
  process.exit(1);
}

export const discordOauth2Client = () =>
  new DiscordOAuth2({
    clientId,
    clientSecret,
    redirectUri,
  });
