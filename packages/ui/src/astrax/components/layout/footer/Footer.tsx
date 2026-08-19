import Link from "next/link";

export default function Footer({ menuItems = [], socials = [] }: any) {
    const formatUrl = (url: string | null) => {
        if (!url || url === "#") return "#";
        if (url.startsWith("http")) return url;
        return url.startsWith("/") ? url : `/${url}`;
    };

    return (
        <footer>
            <div className="section-footer py-5" style={{ backgroundColor: "#1f1f1f" }}>
                <div className="container-fluid px-5">
                    <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between">
                        {/* Left: Logo */}
                        <div className="mb-4 mb-lg-0">
                            <Link href="/">
                                <img src="http://web.lcaba.test/_pagedata/page/images/jl58gsopll_1595522903.3196.png" height={60} alt="Legislatura Logo" />
                            </Link>
                        </div>

                        {/* Right: Menu, Socials, Copyright */}
                        <div className="d-flex flex-column align-items-lg-end align-items-center">
                            {/* Menu */}
                            <ul className="list-inline mb-3">
                                {menuItems.map((item: any) => (
                                    <li className="list-inline-item px-2" key={item.id}>
                                        <Link href={formatUrl(item.url)} className="text-secondary hover-effect-1 text-decoration-none text-capitalize">
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* Socials */}
                            <div className="d-flex gap-4 mb-3">
                                {socials.map((social: any) => (
                                    <Link key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="text-secondary">
                                        <i className={`fa-brands ${social.icon}`}></i>
                                    </Link>
                                ))}
                            </div>

                            {/* Copyright */}
                            <p className="text-secondary m-0 text-center text-lg-end" style={{ fontSize: "0.85rem" }}>
                                © 2026 Micro Sitio Dirección General de Asuntos Culturales y Patrimoniales - Legislatura de la Ciudad Autónoma de Buenos Aires +549 11 43384059 <Link href="/contacto" className="text-primary text-decoration-none"><i className="fa-solid fa-envelope"></i> CONTACTO</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
