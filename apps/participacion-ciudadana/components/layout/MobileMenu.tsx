"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
    isMobileMenu: boolean;
    handleMobileMenu: () => void;
}

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: MobileMenuProps) {
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
                                            <Link href="/">Homepages</Link>
                                        </li>
                                        <li>
                                            <Link href="/about">About Us</Link>
                                        </li>
                                        <li className="has-children">
                                            <span className="menu-expand" onClick={() => handleAccordion(1)}>
                                                <i className="arrow-small-down" />
                                            </span>
                                            <Link href="#">Services</Link>
                                            <ul className="sub-menu" style={{ display: `${isAccordion == 1 ? "block" : "none"}` }}>
                                                <li>
                                                    <Link href="/our-services">Services</Link>
                                                </li>
                                                <li>
                                                    <Link href="/our-services-details">Services Details</Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="has-children">
                                            <Link href="#">Pages</Link>
                                            <span className="menu-expand" onClick={() => handleAccordion(2)}>
                                                <i className="arrow-small-down" />
                                            </span>
                                            <ul className="sub-menu" style={{ display: `${isAccordion == 2 ? "block" : "none"}` }}>
                                                <li>
                                                    <Link href="/events">Events</Link>
                                                </li>
                                                <li>
                                                    <Link href="/project">Project</Link>
                                                </li>
                                                <li>
                                                    <Link href="/blog">Blog</Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link href="/contact">Contact</Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 d-flex flex-column gap-2 border-top">
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
