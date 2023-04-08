import DiscordOAuth2 from "discord-oauth2";

export const discordOauth2Client = () => {
  if (!process.env.DISCORD_CLIENT_ID) {
    console.error("DISCORD_CLIENT_ID is not defined");
  }
  const clientId = process.env.DISCORD_CLIENT_ID;

  if (!process.env.DISCORD_CLIENT_SECRET) {
    console.error("DISCORD_CLIENT_SECRET is not defined");
  }
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;

  if (!process.env.DISCORD_REDIRECT_URI) {
    console.error("DISCORD_REDIRECT_URI is not defined");
  }
  const redirectUri = process.env.DISCORD_REDIRECT_URI;

  return new DiscordOAuth2({
    clientId,
    clientSecret,
    redirectUri,
  });
};
