import { OAuth2Client } from "google-auth-library";

interface GoogleUser {
  email: string;
  name: string;
  picture: string;
}

export async function getGoogleInfo(client: OAuth2Client) {
  const { data } = await client.request<GoogleUser>({
    url: "https://www.googleapis.com/oauth2/v3/userinfo",
  });
  return {data};
}
