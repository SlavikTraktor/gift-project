import { loginApi } from "@/api/auth/login";
import { Button } from "@/components/form/Button/Button";
import { TextInput } from "@/components/form/TextInput/TextInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import * as ls from "local-storage";
import { GETAUTH_QUERY } from "@/api/partner/partner";

export const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();

  const loginMutation = useMutation(
    ({ login, password }: { login: string; password: string }) => {
      return loginApi(login, password);
    },
    {
      onSuccess: (res) => {
        ls.set("refreshToken", res.data.refreshToken);
        ls.set("accessToken", res.data.accessToken);

        queryClient.invalidateQueries([GETAUTH_QUERY]);
      },
    }
  );

  const onLogin = useCallback(() => {
    loginMutation.mutate({ login, password });
  }, [login, loginMutation, password]);

  return (
    <div className="flex items-center flex-col mt-6">
      <h2>Login</h2>
      <TextInput
        className="mt-5"
        onChange={(v) => setLogin(v)}
        placeholder="Username"
      />
      <TextInput
        className="mt-2"
        onChange={(v) => setPassword(v)}
        type="password"
        placeholder="Password"
      />
      <Button onClick={onLogin} className="mt-3">
        Sign in
      </Button>
    </div>
  );
};
