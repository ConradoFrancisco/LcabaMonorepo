import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function FullWidthPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div>{children}</div>
    </ProtectedRoute>
  );
}
