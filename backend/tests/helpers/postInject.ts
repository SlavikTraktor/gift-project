import { app } from "@/app";

export const postInject = (
  instance: typeof app,
  url: string,
  body: any,
  authToken?: string
) => {
  const headers: any = {
    "content-type": "application/json",
  };

  if (authToken) {
    headers["authorization"] = `Bearer ${authToken}`;
  }

  return instance.inject({
    method: "POST",
    url,
    payload: JSON.stringify(body),
    headers,
  });
};
