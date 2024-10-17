import LoginForm from '../../components/Auth/Login';
import AuthLayout from '../../layouts/auth.layout';

export default function Login() {
  return (
    <AuthLayout>
      <>
        <LoginForm />
      </>
    </AuthLayout>
  );
}
