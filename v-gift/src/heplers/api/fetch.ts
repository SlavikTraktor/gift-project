import * as ls from "local-storage";
import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import { refreshApi } from "@/api/auth/refresh";
import { Routes } from "@/constants/routes";
import { BACKEND_URL } from "@/constants/api";

const config: AxiosRequestConfig = {
  baseURL: BACKEND_URL,
  timeout: 1000,
  headers: { "content-type": "application/json" },
};

const updateTokens = async () => {
  const refreshToken = ls.get<string>("refreshToken");
  try {
    const refreshResponse = await refreshApi(refreshToken);

    if (refreshResponse.status !== 200) {
      throw new Error("Not authorized");
    }

    ls.set("accessToken", refreshResponse.data.accessToken);
    ls.set("refreshToken", refreshResponse.data.refreshToken);

    return refreshResponse.data;
  } catch (error) {
    ls.remove("accessToken");
    ls.remove("refreshToken");
    throw error;
  }
};

const addAuthData = async (config: AxiosRequestConfig) => {
  const accessToken = ls.get<string | undefined>("accessToken");

  if (!accessToken || !isTokenExpired(accessToken)) {
    return config;
  }

  try {
    const tokens = await updateTokens();

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${tokens.accessToken}`,
    };

    return config;
  } catch (error) {
    window.location.href = Routes.LOGIN;
    throw error;
  }
};

export const _post = async <T extends any>(
  url: string,
  data: Record<string, unknown> | undefined = undefined
) => {
  const configAuth = await addAuthData(config);
  return axios.post<T>(url, JSON.stringify(data), configAuth);
};

export const _get = async <T extends any>(
  url: string,
  data?: Record<string, unknown>
) => {
  const configAuth = await addAuthData(config);
  return axios.get<T>(
    url + qs.stringify(data, { arrayFormat: "indices", addQueryPrefix: true }),
    configAuth
  );
};

function isTokenExpired(token: string) {
  const expiry = JSON.parse(atob(token.split(".")[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
}
