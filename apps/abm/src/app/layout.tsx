import { Outfit } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import type { Metadata } from 'next';

const outfit = Outfit({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Lcaba Admin',
    template: '%s | Lcaba Admin',
  },
  icons: {
    icon: '/images/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <AuthProvider>
            <SidebarProvider>
              {children}
              <ToastContainer position="bottom-right" theme="colored" autoClose={4000} />
            </SidebarProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
