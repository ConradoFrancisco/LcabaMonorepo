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

export function formatNavUrl(item: any, parent?: any): string {
    if (!item.url || item.url === "#") return "#";
    if (item.url.startsWith("http")) return item.url;
    const slug = slugify(item.title);
    return parent ? `/${slugify(parent.title)}/${slug}` : `/${slug}`;
}


export default function Header({ scroll, isMobileMenu, handleMobileMenu, menuItems, logo }: any) {
    return (
        <>
            <header>
                <div className="position-absolute top-0 start-0 w-100">
                    <nav className={`navbar navbar-expand-lg navbar-transparent-2 z-5 ${scroll ? "navbar-stick top-0 position-fixed w-100" : ""}`}>
                        <div className="container mt-3 mb-3">
                            <Link className="navbar-brand" href="/">
                                <img src={`${process.env.NEXT_PUBLIC_IMAGES}/${logo.location}/${logo.filename}?key=${process.env.NEXT_PUBLIC_FILESERVER_KEY}`} alt={logo?.alt} width={150} height={95} />

                            </Link>
                            <div className="d-none d-lg-flex">
                                <ul className="navbar-nav mx-auto gap-4 align-items-lg-center">
                                    {menuItems.map((item: any) => {
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
                            <div className="d-flex align-items-center gap-4">
                                <img src="https://www.legislatura.gob.ar/_pagedata/page/images/6lf3r7imj7_1664903744.8227.png" alt="" width={230} />
                                <div className="burger-icon burger-icon-white border rounded-3 top-0 end-0" onClick={handleMobileMenu}>
                                    <span className="burger-icon-top" />
                                    <span className="burger-icon-mid" />
                                    <span className="burger-icon-bottom" />
                                </div>
                            </div>
                        </div>
                    </nav>
                    <MobileMenu isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />
                </div>
            </header>
        </>
    );
}
