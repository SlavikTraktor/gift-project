import { app as OldApp } from "@/app";
import mock from "mock-require";

export const reRequireApp = (): typeof OldApp => {
  const { app } = mock.reRequire("@/app");

  return app;
};
