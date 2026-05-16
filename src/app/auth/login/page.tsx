import { Suspense } from 'react'
import LoginForm from '@/components/auth/SignInForm';

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}