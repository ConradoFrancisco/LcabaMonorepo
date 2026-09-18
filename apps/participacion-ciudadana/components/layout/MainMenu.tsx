"use client";
import Link from "next/link";

export function slugify(text: string): string {
    return text
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

export function formatNavUrl(item: any, parent?: any): string {
    if (!item.url || item.url === "#") return "#";
    if (item.url.startsWith("http")) return item.url;
    const slug = slugify(item.title);
    return parent ? `/${slugify(parent.title)}/${slug}` : `/${slug}`;
}

export default function MainMenu({ menuItems = [] }: { menuItems?: any[] }) {
    return (
        <ul className="navbar-nav mx-auto gap-4 align-items-lg-center">
            {menuItems.map((item: any) => {
                const hasSubItems = item.subItems && item.subItems.length > 0;
                const itemUrl = formatNavUrl(item);

                if (hasSubItems) {
                    return (
                        <li className="nav-item dropdown menu-item-has-children" key={item.id}>
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
                            <Link className="nav-link text-uppercase" href={itemUrl}>
                                {item.title}
                            </Link>
                        </li>
                    );
                }
            })}

            {/* Menú desplegable para Accesos de Usuarios */}
            <li className="nav-item dropdown menu-item-has-children ms-lg-2">
                <Link
                    className="nav-link text-uppercase d-flex align-items-center gap-1 access-menu-trigger"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <i className="ri-user-3-line " style={{ fontSize: "16px" }} />
                    <span className="pe-2" >Ingresar</span>
                </Link>
                <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 py-2" style={{ minWidth: "260px" }}>
                    <li>
                        <Link
                            className="dropdown-item d-flex align-items-center gap-2 py-2"
                            href="/login/lcaba"
                        >
                            <i className="ri-smartphone-line text-primary" style={{ fontSize: "17px" }} />
                            <span>Acceso Personal LCABA</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="dropdown-item d-flex align-items-center gap-2 py-2"
                            href="/login/ext"
                        >
                            <i className="ri-login-box-line text-secondary" style={{ fontSize: "17px" }} />
                            <span>Acceso Usuarios Registrados</span>
                        </Link>
                    </li>
                    <li>
                        <hr className="dropdown-divider my-1" />
                    </li>
                    <li>
                        <Link
                            className="dropdown-item d-flex align-items-center gap-2 py-2 fw-semibold text-primary"
                            href="/registro"
                        >
                            <i className="ri-user-add-line" style={{ fontSize: "17px" }} />
                            <span>¿No tenés una cuenta? Creá una</span>
                        </Link>
                    </li>
                </ul>
            </li>
        </ul>
    );
}
