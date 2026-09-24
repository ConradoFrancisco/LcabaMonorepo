import Link from "next/link";
import { formatNavUrl } from "../MainMenu";

export default function Footer({ menuItems, logo, address }: any) {
    const currentYear = new Date().getFullYear();

    return (
        <>
            {/* Footer */}
            <footer>
                <div className="section-footer-17 position-relative overflow-hidden border-top bg-dark-2">
                    <div className="container-fluid">
                        <div className="container position-relative z-2">
                            <div className="row pt-80 pb-60 g-5">

                                {/* Logo + descripción */}
                                <div className="col-lg-4 col-md-6">
                                    <Link href="/" className="d-inline-block mb-4">
                                        <img
                                            src={"https://www.legislatura.gob.ar/_pagedata/page/images/fmgyw7dfxx_1664903694.6236.png"}
                                            alt="Legislatura CABA"
                                            style={{ maxHeight: 64, width: "auto" }}
                                        />
                                    </Link>
                                    <p className="text-white text-opacity-50 mb-0" style={{ fontSize: "0.875rem", lineHeight: 1.7 }}>
                                        Legislatura de la Ciudad Autónoma de Buenos Aires.
                                        Participación ciudadana y transparencia institucional.
                                    </p>
                                </div>

                                {/* Menú */}
                                <div className="col-lg-4 col-md-6 ps-lg-5">
                                    <h6 className="text-white fw-semibold mb-4 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.15)", letterSpacing: "0.05em", textTransform: "uppercase", fontSize: "0.75rem" }}>
                                        Menú
                                    </h6>
                                    <div className="row">
                                        <div className="col-6 d-flex flex-column gap-2">
                                            {menuItems?.slice(0, Math.ceil((menuItems?.length || 0) / 2)).map((item: any) => (
                                                <Link href={formatNavUrl(item)} key={item.id} className="text-white text-opacity-50 text-decoration-none footer-nav-link text-capitalize">
                                                    {item.title}
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="col-6 d-flex flex-column gap-2">
                                            {menuItems?.slice(Math.ceil((menuItems?.length || 0) / 2)).map((item: any) => (
                                                <Link href={formatNavUrl(item)} key={item.id} className="text-white text-opacity-50 text-decoration-none footer-nav-link text-capitalize">
                                                    {item.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Redes sociales */}
                                <div className="col-lg-4 col-md-6 ps-lg-5">
                                    <h6 className="text-white fw-semibold mb-4 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.15)", letterSpacing: "0.05em", textTransform: "uppercase", fontSize: "0.75rem" }}>
                                        Seguinos
                                    </h6>
                                    <div className="d-flex gap-3">
                                        <a href="https://www.facebook.com/LegislaturaCaba" target="_blank" rel="noopener noreferrer" className="footer-social-icon" title="Facebook" aria-label="Facebook">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor" width="18" height="18">
                                                <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                                            </svg>
                                        </a>
                                        <a href="https://x.com/legislaturacaba" target="_blank" rel="noopener noreferrer" className="footer-social-icon" title="X (Twitter)" aria-label="X (Twitter)">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="18" height="18">
                                                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                                            </svg>
                                        </a>
                                        <a href="https://www.youtube.com/LegislaturaCaba" target="_blank" rel="noopener noreferrer" className="footer-social-icon" title="YouTube" aria-label="YouTube">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" width="20" height="18">
                                                <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
                                            </svg>
                                        </a>
                                        <a href="https://www.instagram.com/legislaturacaba" target="_blank" rel="noopener noreferrer" className="footer-social-icon" title="Instagram" aria-label="Instagram">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width="18" height="18">
                                                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                            </div>

                            {/* Bottom bar */}
                            <div className="d-flex flex-column flex-sm-row gap-2 align-items-center py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                                <p className="m-0 text-white text-opacity-50" style={{ fontSize: "0.8125rem" }}>
                                    © {currentYear} {address}.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <style>{`
                    .footer-nav-link {
                        font-size: 0.875rem;
                        transition: color 0.2s, opacity 0.2s;
                    }
                    .footer-nav-link:hover {
                        color: #fff !important;
                        opacity: 1 !important;
                    }
                    .footer-social-icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 38px;
                        height: 38px;
                        border-radius: 8px;
                        background: rgba(255,255,255,0.07);
                        color: rgba(255,255,255,0.55);
                        transition: background 0.2s, color 0.2s;
                        text-decoration: none;
                    }
                    .footer-social-icon:hover {
                        background: rgba(255,255,255,0.15);
                        color: #fff;
                    }
                `}</style>
            </footer>
        </>
    );
}
