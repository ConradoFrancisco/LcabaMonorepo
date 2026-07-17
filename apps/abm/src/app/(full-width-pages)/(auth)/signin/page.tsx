import SignInForm from '@/components/auth/SignInForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login for Legislatura',
};

export default function SignIn() {
  return <SignInForm />;
}
