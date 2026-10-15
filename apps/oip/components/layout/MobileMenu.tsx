"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { formatNavUrl } from "./header/Header";

interface MobileMenuProps {
    isMobileMenu: boolean;
    handleMobileMenu: () => void;
    menuItems?: any[];
    logo?: any;
}

export default function MobileMenu({
    isMobileMenu,
    handleMobileMenu,
    menuItems = [],
    logo,
}: MobileMenuProps) {
    const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
    const pathname = usePathname();

    const handleAccordion = (key: number) => {
        setOpenSubmenu((prev) => (prev === key ? null : key));
    };

    useEffect(() => {
        if (isMobileMenu) {
            handleMobileMenu();
        }
    }, [pathname]);

    const logoSrc = logo
        ? `${process.env.NEXT_PUBLIC_IMAGES}/${logo.location}/${logo.filename}?key=${process.env.NEXT_PUBLIC_FILESERVER_KEY}`
        : "/assets/logo.png";

    return (
        <>
            {isMobileMenu && <div className="mobile-menu-overlay" onClick={handleMobileMenu} />}

            <div
                className={`mobile-header-active mobile-header-wrapper-style ${isMobileMenu ? "sidebar-visible" : ""}`}
                style={{
                    transform: isMobileMenu ? "translateX(0)" : "translateX(100%)",
                    display: isMobileMenu ? "block" : "none",
                }}
            >
                <div className="mobile-header-wrapper-inner d-flex flex-column h-100">
                    {/* Header del drawer: Logo y botón cerrar */}
                    <div className="mobile-header-logo d-flex align-items-center justify-content-between p-3 border-bottom">
                        <Link className="d-flex align-items-center gap-2" href="/" onClick={handleMobileMenu}>
                            <img
                                src={logoSrc}
                                alt="Oficina de Integridad Pública"
                                style={{ maxHeight: "55px", maxWidth: "160px", width: "auto", height: "auto", objectFit: "contain" }}
                            />
                        </Link>
                        <div
                            className={`burger-icon burger-icon-white border rounded-circle ${isMobileMenu ? "burger-close" : ""}`}
                            onClick={handleMobileMenu}
                            style={{ cursor: "pointer" }}
                        >
                            <span className="burger-icon-top" />
                            <span className="burger-icon-mid" />
                            <span className="burger-icon-bottom" />
                        </div>
                    </div>

                    {/* Menú de navegación dinámico */}
                    <div className="mobile-header-content-area flex-grow-1 overflow-auto">
                        <div className="perfect-scroll">
                            <div className="mobile-menu-wrap mobile-header-border p-3">
                                <nav>
                                    <ul className="mobile-menu ps-0 list-unstyled mb-0">

                                        {menuItems.map((item: any) => {
                                            const hasSub = item.subItems && item.subItems.length > 0;
                                            const itemUrl = formatNavUrl(item);
                                            const isOpen = openSubmenu === item.id;

                                            if (hasSub) {
                                                return (
                                                    <li key={item.id} className="has-children border-bottom py-2">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <Link
                                                                href={itemUrl}
                                                                className="fw-semibold text-dark text-uppercase fs-6 flex-grow-1"
                                                                onClick={handleMobileMenu}
                                                            >
                                                                {item.title}
                                                            </Link>
                                                            <span
                                                                className="menu-expand d-flex align-items-center justify-content-center p-2"
                                                                style={{ cursor: "pointer", borderRadius: "6px" }}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleAccordion(item.id);
                                                                }}
                                                            >
                                                                <i className={`bi ${isOpen ? "bi-chevron-up" : "bi-chevron-down"} fs-6`} />
                                                            </span>
                                                        </div>
                                                        <ul
                                                            className="sub-menu list-unstyled ps-3 mt-2 border-start border-2 border-primary"
                                                            style={{ display: isOpen ? "block" : "none" }}
                                                        >
                                                            {item.subItems.map((sub: any) => (
                                                                <li key={sub.id} className="py-2">
                                                                    <Link
                                                                        href={formatNavUrl(sub, item)}
                                                                        className="text-secondary text-capitalize fs-6 d-block"
                                                                        onClick={handleMobileMenu}
                                                                    >
                                                                        {sub.title}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </li>
                                                );
                                            }

                                            return (
                                                <li key={item.id} className="border-bottom py-2">
                                                    <Link
                                                        href={itemUrl}
                                                        className="fw-semibold text-dark text-uppercase fs-6 d-block"
                                                        onClick={handleMobileMenu}
                                                    >
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>

                    {/* Footer del drawer: Info institucional de Legislatura CABA */}
                    <div className="tgmobile__menu-bottom mt-auto p-3 border-top bg-light">
                        <div className="contact-info">
                            <ul className="list-unstyled mb-0 small text-muted">
                                <li className="mb-2 d-flex align-items-center gap-2">
                                    <i className="bi bi-geo-alt text-primary"></i>
                                    <span>Perú 160, CABA</span>
                                </li>
                                <li className="d-flex align-items-center gap-2">
                                    <i className="bi bi-telephone text-primary"></i>
                                    <span>(011) 4338-3000</span>
                                </li>
                            </ul>
                        </div>
                        <div className="social-links mt-3">
                            <div className="d-flex gap-2">
                                <Link
                                    href="https://www.facebook.com/LegisCABA"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                                    style={{ width: "34px", height: "34px" }}
                                >
                                    <i className="bi bi-facebook" />
                                </Link>
                                <Link
                                    href="https://twitter.com/LegisCABA"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                                    style={{ width: "34px", height: "34px" }}
                                >
                                    <i className="bi bi-twitter-x" />
                                </Link>
                                <Link
                                    href="https://www.instagram.com/legiscaba/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                                    style={{ width: "34px", height: "34px" }}
                                >
                                    <i className="bi bi-instagram" />
                                </Link>
                                <Link
                                    href="https://www.youtube.com/c/LegisCABA"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                                    style={{ width: "34px", height: "34px" }}
                                >
                                    <i className="bi bi-youtube" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
