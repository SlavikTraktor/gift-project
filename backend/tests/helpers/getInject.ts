import app from "@/app";
import qs from "qs";

export const getInject = (
  instance: typeof app,
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryParams?: any,
  authToken?: string
) => {
  const headers: Record<string, string> = {
    "content-type": "application/json",
  };

  if (authToken) {
    headers["authorization"] = `Bearer ${authToken}`;
  }

  return instance.inject({
    method: "GET",
    url: url + qs.stringify(queryParams, { arrayFormat: "indices", addQueryPrefix: true }),
    headers,
  });
};
