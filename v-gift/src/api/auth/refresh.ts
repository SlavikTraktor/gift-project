import axios from "axios";

export const refreshApi = (refreshToken: string) => {
  return axios.post<{ refreshToken: string; accessToken: string }>(
    "auth/refresh",
    JSON.stringify(refreshToken)
  );
};
