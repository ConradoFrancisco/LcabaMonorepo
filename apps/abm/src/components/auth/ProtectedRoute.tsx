'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.loading && !auth.user) {
      router.push('/login');
    }
  }, [auth.user, auth.loading, router]);

  if (auth.loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-gray-900">
        <div className="border-primary h-10 w-10 animate-spin rounded-full border-4 border-solid border-t-transparent"></div>
      </div>
    );
  }

  if (!auth.user) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-6 dark:bg-gray-900">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Redirigiendo al inicio de sesión...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
