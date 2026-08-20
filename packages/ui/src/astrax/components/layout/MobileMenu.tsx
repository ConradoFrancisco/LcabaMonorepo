"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { formatNavUrl } from "../../util/navLinks";

interface MobileMenuProps {
    isMobileMenu: boolean;
    handleMobileMenu: () => void;
    menuItems?: any[];
}

export default function MobileMenu({ isMobileMenu, handleMobileMenu, menuItems = [] }: MobileMenuProps) {
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
                            <img src="/logoCultura.png" alt="Cultura - Legislatura CABA" height={40} />
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
                                        {menuItems.map((item: any) => {
                                            const hasSubItems = item.subItems && item.subItems.length > 0;
                                            if (!hasSubItems) {
                                                return (
                                                    <li key={item.id}>
                                                        <Link href={formatNavUrl(item)}>{item.title}</Link>
                                                    </li>
                                                );
                                            }
                                            return (
                                                <li className="has-children" key={item.id}>
                                                    <Link href={formatNavUrl(item)}>{item.title}</Link>
                                                    <span className="menu-expand" onClick={() => handleAccordion(item.id)}>
                                                        <i className="arrow-small-down" />
                                                    </span>
                                                    <ul className="sub-menu" style={{ display: `${isAccordion === item.id ? "block" : "none"}` }}>
                                                        {item.subItems.map((subItem: any) => (
                                                            <li key={subItem.id}>
                                                                <Link href={formatNavUrl(subItem, item)}>{subItem.title}</Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            );
                                        })}
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
