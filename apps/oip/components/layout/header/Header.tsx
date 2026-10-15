import Link from "next/link";
import MobileMenu from "../MobileMenu";
import MainMenu from "../MainMenu";
import Image from "next/image";
export function slugify(text: string): string {
    return text
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

function isFlagOn(value: unknown): boolean {
    if (value === undefined || value === null) return true;
    if (typeof value === "object" && "data" in (value as any)) {
        return Number((value as { data: number[] }).data?.[0]) === 1;
    }
    return Number(value) === 1 || value === true;
}

export function formatNavUrl(item: any, parent?: any): string {
    if (!item.url || item.url === "#") return "#";
    if (item.url.startsWith("http")) return item.url;
    const slug = slugify(item.title);
    return parent ? `/${slugify(parent.title)}/${slug}` : `/${slug}`;
}


export default function Header({ scroll, isMobileMenu, handleMobileMenu, menuItems, logo }: any) {
    const headerMenuItems = (menuItems || []).filter((item: any) => isFlagOn(item.show_top));

    return (
        <>
            <header>
                <div className="position-absolute top-0 start-0 w-100" style={{ zIndex: 1030 }}>
                    <nav className={`navbar navbar-expand-lg navbar-transparent-2 ${scroll ? "navbar-stick top-0 position-fixed w-100" : ""}`} style={{ zIndex: 1030 }}>
                        <div className="container mt-2 mb-2 d-flex align-items-center justify-content-between">
                            {/* Logo Principal (OIP) */}
                            {logo ? (
                                <Link className="navbar-brand d-flex align-items-center me-0" href="/">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_IMAGES}/${logo.location}/${logo.filename}?key=${process.env.NEXT_PUBLIC_FILESERVER_KEY}`}
                                        alt={logo?.alt || "OIP"}
                                        style={{ maxHeight: "65px", width: "auto", objectFit: "contain" }}
                                    />
                                </Link>
                            ) : (
                                <Link className="navbar-brand me-0" href="/">
                                    <img src="/assets/logo.png" alt="OIP" style={{ maxHeight: "60px", width: "auto" }} />
                                </Link>
                            )}

                            {/* Navegación Desktop */}
                            <div className="d-none d-lg-flex flex-grow-1">
                                <ul className="navbar-nav mx-auto gap-4 align-items-lg-center">
                                    {headerMenuItems.map((item: any) => {
                                        const hasSubItems =
                                            item.subItems && item.subItems.length > 0;
                                        const itemUrl = formatNavUrl(item);
                                        if (hasSubItems) {
                                            return (
                                                <li
                                                    className="nav-item dropdown menu-item-has-children"
                                                    key={item.id}
                                                >
                                                    <Link
                                                        className="nav-link text-uppercase"
                                                        href={itemUrl}
                                                        role="button"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        {item.title}
                                                    </Link>
                                                    <ul className="dropdown-menu">
                                                        {item.subItems.map((subItem: any) => (
                                                            <li key={subItem.id}>
                                                                <Link
                                                                    className="dropdown-item text-capitalize"
                                                                    href={formatNavUrl(subItem, item)}
                                                                >
                                                                    {subItem.title}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            );
                                        } else {
                                            return (
                                                <li className="nav-item" key={item.id}>
                                                    <Link
                                                        className="nav-link text-uppercase"
                                                        href={itemUrl}
                                                    >
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            );
                                        }
                                    })}
                                </ul>
                            </div>

                            {/* Lado Derecho: Logo Legislatura (solo en desktop/tablet) y Botón Hamburguesa */}
                            <div className="d-flex align-items-center gap-3">
                                <img
                                    src="https://www.legislatura.gob.ar/_pagedata/page/images/6lf3r7imj7_1664903744.8227.png"
                                    alt="Legislatura CABA"
                                    className="d-none d-md-block"
                                    style={{ maxHeight: "55px", width: "auto" }}
                                />
                                <div
                                    className="burger-icon burger-icon-white border rounded-3 p-2 d-lg-none"
                                    onClick={handleMobileMenu}
                                    style={{ cursor: "pointer" }}
                                    title="Abrir menú"
                                >
                                    <span className="burger-icon-top" />
                                    <span className="burger-icon-mid" />
                                    <span className="burger-icon-bottom" />
                                </div>
                            </div>
                        </div>
                    </nav>
                    <MobileMenu
                        isMobileMenu={isMobileMenu}
                        handleMobileMenu={handleMobileMenu}
                        menuItems={headerMenuItems}
                        logo={logo}
                    />
                </div>
            </header>
        </>
    );
}
