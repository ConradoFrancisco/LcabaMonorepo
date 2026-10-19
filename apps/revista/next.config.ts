import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@lcaba/ui", "@lcaba/services"],
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
  async headers() {
    return [
      {
        // Permite que /publicaciones/* sea embebido en iframe desde el ABM
        source: "/publicaciones/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "frame-ancestors",
              "'self'",
              // Producción / dominios configurados
              "http://back.legislatura.gob.ar",
              "http://back.lcaba.test",
              // Staging / test
              "http://web.backend.lcaba.test:3001",
              // Desarrollo — IP de red local (ABM y Revista)
              "http://10.151.1.114:3001",
              "http://10.151.1.114:3006",
              "http://10.151.1.114:3007",
              // Desarrollo — localhost en distintos puertos
              "http://localhost:3000",
              "http://localhost:3001",
              "http://localhost:3002",
              "http://localhost:3003",
              "http://localhost:3004",
              "http://localhost:3005",
              "http://localhost:3006",
              "http://localhost:3007",
              "http://localhost:3008",
            ].join(" "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
