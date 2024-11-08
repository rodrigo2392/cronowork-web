import LoginForm from "./forms/login";
import AuthLayout from "../../../layouts/auth.layout";

export default function Login() {
  return (
    <AuthLayout>
      <>
        <LoginForm />
      </>
    </AuthLayout>
  );
}
