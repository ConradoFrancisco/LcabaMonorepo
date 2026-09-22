"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface MobileMenuProps {
    isMobileMenu: boolean;
    handleMobileMenu: () => void;
    menuItems?: any[];
    logo?: any;
}

function slugify(text: string): string {
    return text
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

function formatNavUrl(item: any, parent?: any): string {
    if (!item.url || item.url === "#") return "#";
    if (item.url.startsWith("http")) return item.url;
    const slug = slugify(item.title);
    return parent ? `/${slugify(parent.title)}/${slug}` : `/${slug}`;
}

export default function MobileMenu({ isMobileMenu, handleMobileMenu, menuItems = [], logo }: MobileMenuProps) {
    const { user, isAuthenticated, logout } = useAuth();
    const [isAccordion, setIsAccordion] = useState<number | null>(null);
    const pathname = usePathname();

    const handleAccordion = (key: number) => {
        setIsAccordion((prevState) => (prevState === key ? null : key));
    };

    useEffect(() => {
        if (isMobileMenu) {
            handleMobileMenu();
        }
    }, [pathname]);

    return (
        <>
            {isMobileMenu && <div className="mobile-menu-overlay" onClick={handleMobileMenu} />}

            <div className={`mobile-header-active mobile-header-wrapper-style ${isMobileMenu ? "sidebar-visible" : ""}`}>
                <div className="mobile-header-wrapper-inner">
                    <div className="mobile-header-logo">
                        <Link className="d-flex align-items-center gap-2" href="/">
                            {logo ? (
                                <img
                                    src={`${process.env.NEXT_PUBLIC_IMAGES}/${logo.location}/${logo.filename}?key=${process.env.NEXT_PUBLIC_FILESERVER_KEY}`}
                                    alt={logo?.alt || "Logo"}
                                    style={{ maxHeight: "40px", width: "auto" }}
                                />
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 40 40" fill="none">
                                        <g>
                                            <path className="fill-primary" d="M24.5043 9.79724L22.7082 18.3981L35.2929 17.1948L37.1117 7.00605L24.5043 9.79724Z" />
                                            <path className="fill-primary" d="M31.9171 17.6837L23.2697 20.6189L30.6333 30.3865L40.723 26.6545L31.9171 17.6837Z" />
                                            <path className="fill-primary" d="M28.4204 27.86L21.4605 22.2312L16.332 33.3249L24.7296 39.7347L28.4204 27.86Z" />
                                            <path className="fill-primary" d="M17.5913 29.998L19.1912 21.3633L6.63465 22.8288L5.04812 33.0511L17.5913 29.998Z" />
                                            <path className="fill-primary" d="M10.2917 22.1777L18.8717 19.0632L11.2859 9.45346L1.28177 13.3945L10.2917 22.1777Z" />
                                            <path className="fill-primary" d="M13.7243 12.2243L20.8121 17.7054L25.6875 6.50938L17.1442 0.277556L13.7243 12.2243Z" />
                                        </g>
                                    </svg>
                                    <h5 className="mb-0">Astrax</h5>
                                </>
                            )}
                        </Link>
                        <div className={`burger-icon burger-icon-white border rounded-circle ${isMobileMenu ? "burger-close" : ""}`} onClick={handleMobileMenu}>
                            <span className="burger-icon-top" />
                            <span className="burger-icon-mid" />
                            <span className="burger-icon-bottom" />
                        </div>
                    </div>
                    <div className="mobile-header-content-area">
                        <div className="perfect-scroll">
                            <div className="mobile-menu-wrap mobile-header-border">
                                <nav>
                                    <ul className="mobile-menu ps-0">
                                        <li>
                                            <Link href="/">Inicio</Link>
                                        </li>
                                        {menuItems.map((item: any, idx: number) => {
                                            const hasSub = item.subItems && item.subItems.length > 0;
                                            const itemUrl = formatNavUrl(item);
                                            const keyId = item.id ?? idx;

                                            if (hasSub) {
                                                return (
                                                    <li key={keyId} className="has-children">
                                                        <span className="menu-expand" onClick={() => handleAccordion(keyId)}>
                                                            <i className="arrow-small-down" />
                                                        </span>
                                                        <Link href={itemUrl}>{item.title}</Link>
                                                        <ul className="sub-menu" style={{ display: isAccordion === keyId ? "block" : "none" }}>
                                                            {item.subItems.map((sub: any, subIdx: number) => (
                                                                <li key={sub.id ?? subIdx}>
                                                                    <Link href={formatNavUrl(sub, item)}>{sub.title}</Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </li>
                                                );
                                            }

                                            return (
                                                <li key={keyId}>
                                                    <Link href={itemUrl}>{item.title}</Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 d-flex flex-column gap-2 border-top">
                        {isAuthenticated && user ? (
                            <div className="d-flex flex-column gap-2">
                                <div className="p-3 rounded-3 bg-light border">
                                    <div className="d-flex align-items-center gap-2 mb-1">
                                        <div
                                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                                            style={{ width: "34px", height: "34px", fontSize: "14px" }}
                                        >
                                            {(user.name?.[0] || user.username?.[0] || "U").toUpperCase()}
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="mb-0 fw-bold text-dark small text-truncate">
                                                {user.name ? `${user.name} ${user.surname ?? ""}` : user.username}
                                            </p>
                                            <span className="badge bg-primary-subtle text-primary" style={{ fontSize: "10px" }}>
                                                Personal LCABA
                                            </span>
                                        </div>
                                    </div>
                                    {user.email && (
                                        <p className="mb-0 text-muted small text-truncate mt-1">{user.email}</p>
                                    )}
                                </div>
                                <Link
                                    href="/perfil"
                                    onClick={handleMobileMenu}
                                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 py-2"
                                >
                                    <i className="ri-user-line" />
                                    <span>Mi perfil</span>
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        logout();
                                        handleMobileMenu();
                                    }}
                                    className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 py-2"
                                >
                                    <i className="ri-logout-box-r-line" />
                                    <span>Cerrar sesión</span>
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link href="/login/lcaba" className="header-access-btn btn-personal-lcaba w-100 justify-content-center">
                                    <i className="ri-smartphone-line" />
                                    <span>Acceso Personal LCABA</span>
                                </Link>
                                <Link href="/login/ext" className="header-access-btn btn-registered-user w-100 justify-content-center">
                                    <i className="ri-login-box-line" />
                                    <span>Acceso Usuarios Registrados</span>
                                </Link>
                                <Link href="/registro" className="header-access-btn btn-register w-100 justify-content-center">
                                    <i className="ri-user-add-line" />
                                    <span>No tenés una cuenta? Creá una</span>
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="tgmobile__menu-bottom mt-auto">
                        <div className="contact-info">
                            <ul className="list-wrap">
                                <li>
                                    <span className="opacity-50">Mail:</span> <Link href="/mailto:info@valom.com">info@astrax.com</Link>
                                </li>
                                <li>
                                    <span className="opacity-50">Phone:</span> <Link href="/tel:0123456789">+123 888 9999</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="social-links">
                            <div className="social-icons gap-4 mt-4">
                                <Link href="#" className="border border-opacity-10 border-white icon-shape icon-md">
                                    <i className="bi bi-facebook" />
                                </Link>
                                <Link href="#" className="border border-opacity-10 border-white icon-shape icon-md">
                                    <i className="bi bi-twitter-x" />
                                </Link>
                                <Link href="#" className="border border-opacity-10 border-white icon-shape icon-md">
                                    <i className="bi bi-linkedin" />
                                </Link>
                                <Link href="#" className="border border-opacity-10 border-white icon-shape icon-md">
                                    <i className="bi bi-behance" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
