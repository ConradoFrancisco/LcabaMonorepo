import "../public/assets/css/vendors/bootstrap.min.css";
import "../public/assets/css/vendors/swiper-bundle.min.css";
import "../public/assets/css/vendors/aos.css";
import "../public/assets/css/vendors/carouselTicker.css";
import "../public/assets/css/vendors/odometer.css";
import "../public/assets/css/vendors/magnific-popup.css";
import "../public/assets/fonts/bootstrap-icons/bootstrap-icons.min.css";
import "../public/assets/fonts/boxicons/boxicons.min.css";
import "../public/assets/fonts/remixicon/remixicon.css";
import "../public/assets/fonts/fontawesome/fontawesome.min.css";
import "../public/assets/fonts/fontawesome/solid.min.css";
import "../public/assets/fonts/fontawesome/regular.min.css";
import "../public/assets/css/main.css";
import "../public/assets/css/style.css";

// Fuentes locales (self-hosted via @fontsource — sin dependencia de Google)
import '@fontsource/libre-franklin/300.css';
import '@fontsource/libre-franklin/400.css';
import '@fontsource/libre-franklin/500.css';
import '@fontsource/libre-franklin/600.css';
import '@fontsource/libre-franklin/700.css';
import '@fontsource/rubik/300.css';
import '@fontsource/rubik/400.css';
import '@fontsource/rubik/500.css';
import '@fontsource/rubik/600.css';
import '@fontsource/rubik/700.css';

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "OIP - Oficina de Integridad Pública | Legislatura CABA",
    description: "Oficina de Integridad Pública de la Legislatura de la Ciudad de Buenos Aires",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body>{children}</body>
        </html>
    );
}
