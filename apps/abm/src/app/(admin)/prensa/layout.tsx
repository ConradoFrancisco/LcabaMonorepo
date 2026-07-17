import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prensa',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
