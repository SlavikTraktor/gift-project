import { _post } from "@/heplers/api/fetch";

export const loginApi = async (login: string, password: string) => {
  return await _post<{ refreshToken: string, accessToken: string }>("auth/login", {
    name: login,
    password,
  });
};
