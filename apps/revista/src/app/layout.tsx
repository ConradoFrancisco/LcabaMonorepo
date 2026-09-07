import "../../public/assets/css/vendors/bootstrap.min.css";
import "../../public/assets/css/vendors/swiper-bundle.min.css";
import "../../public/assets/css/vendors/aos.css";
import "../../public/assets/fonts/bootstrap-icons/bootstrap-icons.min.css";
import "../../public/assets/fonts/boxicons/boxicons.min.css";
import "../../public/assets/fonts/fontawesome/fontawesome.min.css";
import "../../public/assets/fonts/fontawesome/solid.min.css";
import "../../public/assets/fonts/fontawesome/regular.min.css";
import "./custom-theme.css";
import type { Metadata } from "next";
import { Libre_Franklin, Rubik } from "next/font/google";

const libreFranklin = Libre_Franklin({
  weight: ["400", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-franklin",
  display: "swap",
});

const rubik = Rubik({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LA CASA - Revista Digital",
  description: "Revista digital de la Legislatura de la Ciudad Autónoma de Buenos Aires",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${libreFranklin.variable} ${rubik.variable} min-h-screen bg-white text-slate-800`}>
        {children}
      </body>
    </html>
  );
}
