import Link from "next/link";
import { NavMenuItem } from '@lcaba/services';

export default function Footer({ menuItems = [], logo, pageVw }: { menuItems?: NavMenuItem[], logo?: any, pageVw?: any }) {
    const title = pageVw?.title || "Oficina de Integridad Pública";
    const address = pageVw?.shipping_info ? pageVw.shipping_info.replace(/<[^>]*>/g, '') : "Perú 160, Planta Principal Of. 17, C1067AAD Ciudad Autónoma de Buenos Aires, República Argentina 4338-3000 int.1195 / 7151";

    return (
        <footer>


            {/* Main Dark Footer */}
            <div className="bg-dark pt-5 pb-4 position-relative">
                <div className="container position-relative z-2">
                    <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between mb-4">
                        {/* Logo */}
                        <div className="mb-4 mb-lg-0">
                            <Link href="/">
                                {logo ? (
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_IMAGES}/${logo?.location}/${logo?.filename}?key=${process.env.NEXT_PUBLIC_FILESERVER_KEY}`}
                                        alt={logo?.alt || title}
                                        style={{ maxWidth: '280px', height: 'auto', filter: 'brightness(0) invert(1)' }}
                                    />
                                ) : (
                                    <h4 className="text-white mb-0">{title}</h4>
                                )}
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <ul className="list-unstyled d-flex flex-wrap align-items-center gap-4 mb-0 justify-content-center">
                            <li>
                                <Link href="/">
                                    <span className="text-white opacity-75 hover-effect-1 fs-6">Inicio</span>
                                </Link>
                            </li>
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <Link href={item.url || '#'}>
                                        <span className="text-white opacity-75 hover-effect-1 fs-6">{item.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Bottom Info */}
                    <div className="text-center pt-4 border-top border-secondary border-opacity-25 mt-4">
                        <p className="text-white opacity-50 mb-0 small d-inline-flex align-items-center gap-2 justify-content-center flex-wrap">
                            © {new Date().getFullYear()} {address}
                            <Link href="/contacto" className="text-primary text-decoration-none fw-medium d-flex align-items-center gap-1 ms-2">
                                <i className="bi bi-envelope-fill"></i> CONTACTO
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
