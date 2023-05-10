import { app } from "@/app";

export const postInject = (
  instance: typeof app,
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any,
  authToken?: string
) => {
  const headers: Record<string, string> = {
    "content-type": "application/json",
  };

  if (authToken) {
    headers["authorization"] = `Bearer ${authToken}`;
  }

  return instance.inject({
    method: "POST",
    url,
    payload: body ? JSON.stringify(body) : undefined,
    headers,
  });
};
