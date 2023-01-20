import { BACKEND_URL } from "@/constants/api";
import axios from "axios";

export const refreshApi = async (refreshToken: string) => {
  return await axios.post<{ refreshToken: string, accessToken: string }>(
    BACKEND_URL + "auth/refresh",
    JSON.stringify({ refreshToken }),
    {
      headers: {
        "content-type": "application/json",
      },
    },
  );
};
