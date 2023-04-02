import { loginApi } from "@/api/auth/login";
import { Button } from "@/components/form/Button/Button";
import { TextInput } from "@/components/form/TextInput/TextInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import * as ls from "local-storage";
import { ACCESS_TOKEN_LS, REFRESH_TOKEN_LS } from "@/constants/ls";
import { GETAUTH_QUERY } from "@/constants/api";
import { Link, useSearchParams } from "react-router-dom";
import { Routes } from "@/constants/routes";

interface LoginMutationParams {
  login: string;
  password: string;
}
export const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errAuth, setErrAuth] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState<string | null>(
    "",
  );
  const [params] = useSearchParams();

  useEffect(() => {
    const registrationMessage = params.get("success");
    setRegistrationSuccess(registrationMessage);
  }, []);

  const queryClient = useQueryClient();
  const loginMutation = useMutation(
    async ({ login, password }: LoginMutationParams) => {
      return await loginApi(login, password);
    },
    {
      onSuccess: (res) => {
        ls.set(REFRESH_TOKEN_LS, res.data.refreshToken);
        ls.set(ACCESS_TOKEN_LS, res.data.accessToken);
        queryClient.invalidateQueries([GETAUTH_QUERY]);
      },
      onError: (res: any) => {
        setErrAuth(res.response.data.message);
      },
    },
  );

  const onLogin = useCallback(() => {
    setRegistrationSuccess("");
    loginMutation.mutate({ login, password });
  }, [login, loginMutation, password]);

  return (
    <div className="flex items-center flex-col mt-6">
      <h1 className="text-4xl">SIGN IN</h1>
      <TextInput
        className="mt-5"
        onChange={(v) => {
          setLogin(v.target.value);
        }}
        placeholder="Username"
      />
      <TextInput
        className="mt-2"
        onChange={(v) => {
          setPassword(v.target.value);
        }}
        type="password"
        placeholder="Password"
      />
      <Button onClick={onLogin} className="mt-3">
        Sign in
      </Button>
      Dont have an account yet?
      <Link to={Routes.REGISTRATION}>
        <div className=" text-sm text-blue-600/100 hover:text-black hover:underline ">
          Registration
        </div>
      </Link>
      <div className="mt-2 text-red-600">{errAuth}</div>
      {registrationSuccess && (
        <div className="mt-2 text-green-600">{registrationSuccess}</div>
      )}
    </div>
  );
};
