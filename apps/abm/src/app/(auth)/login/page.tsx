import SignIn from '@/components/auth/SignInForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inicio de sesión',
  description: 'Login for Legislatura',
};

export default function Login() {
  return <SignIn />;
}
