import { _post } from "@/heplers/api/fetch";

export interface LoginResponse {
  refreshToken: string;
  accessToken: string;
}
export const loginApi = async (login: string, password: string) => {
  return await _post<LoginResponse>("auth/login", {
    name: login,
    password,
  });
};
