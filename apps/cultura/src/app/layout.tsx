import "../../public/assets/css/vendors/bootstrap.min.css";
import "../../public/assets/css/vendors/swiper-bundle.min.css";
import "../../public/assets/css/vendors/aos.css";
import "../../public/assets/css/vendors/carouselTicker.css";
import "../../public/assets/css/vendors/odometer.css";
import "../../public/assets/css/vendors/magnific-popup.css";
import "../../public/assets/fonts/bootstrap-icons/bootstrap-icons.min.css";
import "../../public/assets/fonts/boxicons/boxicons.min.css";
import "../../public/assets/fonts/remixicon/remixicon.css";
import "../../public/assets/fonts/fontawesome/fontawesome.min.css";
import "../../public/assets/fonts/fontawesome/solid.min.css";
import "../../public/assets/fonts/fontawesome/regular.min.css";
import "../../public/assets/css/main.css";
import "../../public/assets/css/style.css";
import type { Metadata } from "next";
import { Libre_Franklin, Rubik } from "next/font/google";

const libreFranklinHeading = Libre_Franklin({
    weight: "700",
    subsets: ["latin"],
    variable: "--tc-heading-font-family",
    display: "swap",
});

const libreFranklinBtn = Libre_Franklin({
    weight: "600",
    subsets: ["latin"],
    variable: "--tc-btn-font-family",
    display: "swap",
});

const rubik = Rubik({
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    variable: "--tc-body-font-family",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Cultura - LCABA",
    description: "Micrositio de Cultura - Legislatura de la Ciudad Autónoma de Buenos Aires",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={`${libreFranklinHeading.variable} ${libreFranklinBtn.variable} ${rubik.variable}`}>{children}</body>
        </html>
    );
}
