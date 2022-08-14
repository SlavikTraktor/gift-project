import { _post } from "@/heplers/api/fetch";

export const loginApi = (login: string, password: string) => {
  return _post<{ refreshToken: string; accessToken: string }>("auth/login", {
    name: login,
    password
  });
};
