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
                            <svg className="fill-primary" xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 40 40" fill="none">
                                <g clipPath="url(#clip0_2279_27500)">
                                    <path d="M24.5053 9.79627L22.7092 18.3971L35.2939 17.1938L37.1127 7.00508L24.5053 9.79627Z" fill="#ECAB23" />
                                    <path d="M31.918 17.6827L23.2707 20.618L30.6343 30.3856L40.724 26.6535L31.918 17.6827Z" fill="#ECAB23" />
                                    <path d="M28.4214 27.859L21.4615 22.2303L16.3329 33.3239L24.7306 39.7337L28.4214 27.859Z" fill="#ECAB23" />
                                    <path d="M17.5922 29.997L19.1922 21.3623L6.63563 22.8278L5.0491 33.0501L17.5922 29.997Z" fill="#ECAB23" />
                                    <path d="M10.2927 22.1767L18.8727 19.0623L11.2868 9.45248L1.28274 13.3935L10.2927 22.1767Z" fill="#ECAB23" />
                                    <path d="M13.7252 12.2233L20.813 17.7044L25.6885 6.50841L17.1452 0.276579L13.7252 12.2233Z" fill="#ECAB23" />
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
                                            <Link href="#">Causes</Link>
                                            <ul className="sub-menu" style={{ display: `${isAccordion == 1 ? "block" : "none"}` }}>
                                                <li>
                                                    <Link href="/our-causes">Causes</Link>
                                                </li>
                                                <li>
                                                    <Link href="/our-causes-details">Causes Details</Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="has-children">
                                            <Link href="#">Donation</Link>
                                            <span className="menu-expand" onClick={() => handleAccordion(2)}>
                                                <i className="arrow-small-down" />
                                            </span>
                                            <ul className="sub-menu" style={{ display: `${isAccordion == 2 ? "block" : "none"}` }}>
                                                <li>
                                                    <Link href="/donation">Donation</Link>
                                                </li>
                                                <li>
                                                    <Link href="/donation-details">case Details</Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link href="/become-a-volunteer">Become a Volunteer</Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
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
