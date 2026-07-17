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
    return null;
  }

  return <>{children}</>;
}
