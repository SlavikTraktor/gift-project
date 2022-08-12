import { Button } from "@/components/form/Button/Button";
import { TextInput } from "@/components/form/TextInput/TextInput";

export const LoginPage = () => {
  return (
    <div className="flex items-center flex-col mt-6">
      <h2>Login</h2>
      <TextInput className="mt-5" onChange={() => {}} placeholder="Username" />
      <TextInput
        className="mt-2"
        onChange={() => {}}
        type="password"
        placeholder="Password"
      />
      <Button className="mt-3">Sign in</Button>
    </div>
  );
};
