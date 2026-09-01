import Link from "next/link";

export default function MainMenu() {
    return (
        <ul className="navbar-nav mx-auto gap-4 align-items-lg-center">
            <li className="nav-item">
                <Link className="nav-link text-uppercase" href="/">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-uppercase" href="/about">
                    About
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-uppercase" href="/our-blog">
                    Blog
                </Link>
            </li>
            <li className="nav-item dropdown menu-item-has-children">
                <Link className="nav-link text-uppercase" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Pages
                </Link>
                <ul className="dropdown-menu">
                    <li>
                        <Link className="dropdown-item text-capitalize" href="/services">
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item text-capitalize" href="/projects">
                            projects
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item text-capitalize" href="/pricing-plan">
                            pricing
                        </Link>
                    </li>
                </ul>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-uppercase" href="/contact">
                    contact
                </Link>
            </li>
        </ul>
    );
}
