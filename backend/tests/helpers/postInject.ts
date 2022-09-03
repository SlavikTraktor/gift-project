import { app } from "@/app";

export const postInject = (instance: typeof app, url: string, body: any) => {
  return instance.inject({
    method: "POST",
    url,
    payload: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  });
};
