import RegisterForm from '../../components/Auth/Register';
import AuthLayout from '../../layouts/auth.layout';

export default function Login() {
  return (
    <AuthLayout>
      <>
        <RegisterForm />
      </>
    </AuthLayout>
  );
}
