/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // Permite que /novedades/* sea embebido en iframe desde el ABM
                source: '/novedades/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            "frame-ancestors",
                            "'self'",
                            // Producción / dominios configurados
                            "http://back.legislatura.gob.ar",
                            "http://back.lcaba.test",
                            // Staging / test
                            "http://web.backend.lcaba.test:3001",
                            // Desarrollo — IP de red local (ABM y OIP)
                            "http://10.151.1.114:3001",
                            "http://10.151.1.114:3006",
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
                        ].join(' '),
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
