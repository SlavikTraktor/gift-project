import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/form/Button/Button";
import { RegisterParams, registrationApi } from "@/api/register/register";
import { schema } from "./validation/registrationShema";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { TextInput } from "@/components/form/TextInput/TextInput";
import { Loader } from "@/components/common/Loader";
import cx from "classnames";
import { useNavigate } from "react-router";
import { Routes } from "@/constants/routes";

const SUCCESS_MSG = "Congratulations! You have successfully registered!";

type FormData = yup.InferType<typeof schema>;

export function RegistrationPage() {
  const [errorRegistration, setErrorRegistration] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const registrationMutation = useMutation(
    async ({ email, name, password }: RegisterParams) => {
      await new Promise((res) => setTimeout(res, 2000));

      return await registrationApi({ email, name, password });
    },
    {
      onSuccess: (res) => {
        navigate(`${Routes.LOGIN}?success=${SUCCESS_MSG}`);
      },
      onError: (res: any) => {
        setErrorRegistration(res.response?.data?.message);
      },
    },
  );

  const onSubmit = useCallback(
    (data: FormData) => {
      setErrorRegistration("");
      const { email, name, password } = data;
      registrationMutation.mutate({ email, name, password });
    },
    [registrationMutation],
  );

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-4xl mt-10">Registration</h1>
        <TextInput
          className="mt-5"
          placeholder="Email"
          {...register("email")}
        />
        <p className="text-red-600">{errors.email?.message}</p>
        <TextInput className="mt-5" placeholder="Login" {...register("name")} />
        <p className="text-red-600">{errors.name?.message}</p>
        <TextInput
          type="password"
          className="mt-5"
          placeholder="Password"
          {...register("password")}
        />
        <p className="text-red-600">{errors.password?.message}</p>
        <TextInput
          type="password"
          className="mt-5"
          placeholder="Password Again"
          {...register("passwordAgain")}
        />
        <p className="text-red-600">{errors.passwordAgain?.message}</p>
        <Button className=" ml-6 mr-2">Registration</Button>
        <Loader
          className={cx({
            "opacity-0": !registrationMutation.isLoading,
            "opacity-100": registrationMutation.isLoading,
          })}
        />
      </form>
      <div className="text-red-600">{errorRegistration}</div>
    </div>
  );
}
