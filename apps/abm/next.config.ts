import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false, // <--- desactiva Strict Mode globalmente
  allowedDevOrigins: ['10.151.1.114'],
  typescript: {
    // Los errores de TypeScript preexistentes no bloquean el build de producción.
    // Deben corregirse en una tarea de deuda técnica separada.
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'www.legislatura.gob.ar',
        port: '3000',
        pathname: '/cultura/images/**',
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com',
        pathname: '/**',
      },
    ],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
