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
import "./custom-theme.css";
import "./components/home/home.css";
import type { Metadata } from "next";
import { Libre_Franklin, Rubik } from "next/font/google";
import { PageServices } from "@lcaba/services";
import SiteHeader from "./components/home/SiteHeader";
import SiteFooter from "./components/home/SiteFooter";
import { buildHeaderNav } from "./components/home/utils";

const MATERIAL_SYMBOLS_URL =
    "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block";

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

const libreFranklinDisplay = Libre_Franklin({
    weight: ["400", "500", "600", "700", "800"],
    subsets: ["latin"],
    variable: "--cl-font-display",
    display: "swap",
});

const rubik = Rubik({
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    variable: "--tc-body-font-family",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Asuntos Culturales",
    description: "Micrositio de Cultura - Legislatura de la Ciudad Autónoma de Buenos Aires",
};

async function getMenuItems() {
    const cached = await PageServices.getNavMenu();
    if (cached.length > 0) return cached;
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API}/nav-menu/tree?pageId=3`,
            { next: { revalidate: 5 } },
        );
        const data = await res.json();
        return Array.isArray(data) ? data : data.data || [];
    } catch {
        return [];
    }
}

async function getSocials() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API}/general/pages/3/socials`,
            { next: { revalidate: 60 } },
        );
        const data = await res.json();
        if (Array.isArray(data)) return data;
        if (data.value && Array.isArray(data.value)) return data.value;
        return [];
    } catch {
        return [];
    }
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [menuItems, socials] = await Promise.all([getMenuItems(), getSocials()]);

    return (
        <html lang="es">
            <body
                className={`${libreFranklinHeading.variable} ${libreFranklinBtn.variable} ${libreFranklinDisplay.variable} ${rubik.variable}`}
            >
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="stylesheet" href={MATERIAL_SYMBOLS_URL} precedence="default" />
                <div className="cl-root">
                    <SiteHeader navItems={buildHeaderNav(menuItems)} />
                    <main>{children}</main>
                    <SiteFooter menuItems={menuItems} socials={socials} />
                </div>
            </body>
        </html>
    );
}
