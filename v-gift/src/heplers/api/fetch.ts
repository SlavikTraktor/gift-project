import * as ls from "local-storage";
import axios from "axios";
import qs from "qs";
import { refreshApi } from "@/api/auth/refresh";
import { Routes } from "@/constants/routes";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3008/",
  timeout: 1000,
  headers: { "content-type": "application/json" },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = ls.get<string | undefined>("accessToken");

    if (!accessToken || !isTokenExpired(accessToken)) {
      return config;
    }

    const refreshToken = ls.get<string>("refreshToken");
    const refreshResponse = await refreshApi(refreshToken);

    if (refreshResponse.status !== 200) {
      throw new Error("Not authorized");
    }

    ls.set("accessToken", refreshResponse.data.accessToken);
    ls.set("refreshToken", refreshResponse.data.refreshToken);

    return config;
  },
  function (error) {
    ls.remove("accessToken");
    ls.remove("refreshToken");
    window.location.href = Routes.LOGIN;
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use((config) => {
  const accessToken = ls.get<string | undefined>("accessToken");

  if (!accessToken) {
    return config;
  }

  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  return config;
});

export const _post = <T extends any>(
  url: string,
  data: Record<string, unknown> | undefined = undefined
) => {
  return axiosInstance.post<T>(url, JSON.stringify(data));
};

export const _get = <T extends any>(
  url: string,
  data: Record<string, unknown>
) => {
  return axiosInstance.get<T>(
    url + qs.stringify(data, { arrayFormat: "indices", addQueryPrefix: true })
  );
};

function isTokenExpired(token: string) {
  const expiry = JSON.parse(atob(token.split(".")[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
}
