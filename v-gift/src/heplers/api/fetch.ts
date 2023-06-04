import * as ls from "local-storage";
import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import { refreshApi } from "@/api/auth/refresh";
import { Routes } from "@/constants/routes";
import { BACKEND_URL, MAX_REFRESH_ERRORS_COUNT } from "@/constants/api";
import { ACCESS_TOKEN_LS, REFRESH_TOKEN_LS } from "@/constants/ls";

const config: AxiosRequestConfig = {
  baseURL: BACKEND_URL,
  timeout: 10000,
  headers: { "content-type": "application/json" },
};

// If few requests are made at the same time it can be possible
// to unlogin cause second refresh request fails. So this prevents this behaviour.
let errorCount = 0;

const updateTokens = async () => {
  const refreshToken = ls.get<string>("refreshToken");
  try {
    const refreshResponse = await refreshApi(refreshToken);

    if (refreshResponse.status !== 200) {
      throw new Error("Not authorized");
    }

    ls.set(ACCESS_TOKEN_LS, refreshResponse.data.accessToken);
    ls.set(REFRESH_TOKEN_LS, refreshResponse.data.refreshToken);
    errorCount = 0;
    return refreshResponse.data;
  } catch (error) {
    errorCount++;
    if (errorCount >= MAX_REFRESH_ERRORS_COUNT) {
      ls.remove(ACCESS_TOKEN_LS);
      ls.remove(REFRESH_TOKEN_LS);
    }
    throw error;
  }
};

const addAuthData = async (config: AxiosRequestConfig) => {
  const accessToken = ls.get<string | undefined>(ACCESS_TOKEN_LS);

  if (!accessToken) {
    return config;
  }

  if (!isTokenExpired(accessToken)) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
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
  }
};

export const _post = async <T>(
  url: string,
  data: Record<string, unknown> | undefined = undefined,
) => {
  const configAuth = await addAuthData(config);
  return await axios.post<T>(url, JSON.stringify(data), configAuth);
};

export const _get = async <T>(url: string, data?: Record<string, unknown>) => {
  const configAuth = await addAuthData(config);
  return await axios.get<T>(
    url + qs.stringify(data, { arrayFormat: "indices", addQueryPrefix: true }),
    configAuth,
  );
};

function isTokenExpired(token: string) {
  const expiry = JSON.parse(atob(token.split(".")[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry - 5;
}
