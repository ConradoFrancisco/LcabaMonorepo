import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OIP - Informes',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
